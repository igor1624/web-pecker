import Device from "@ui-kit/engine/device";

namespace Network {
  let connections = <Connection[]>[];

  // rest

  export class Request {
    private $key: number;
    private readonly type: "get" | "post" | "put";
    private body: any;
    private minDuration: number;
    onSuccess: Function;
    onError: Function;

    constructor(type: "get" | "post" | "put", body?: any) {
      this.$key = Device.get$Key();
      this.type = type;
      this.setBody(body);
    }

    setHeaders() {

    }

    setBody(body: any) {
      this.body = body;
    }

    setMinDuration(minDuration: number) {
      this.minDuration = minDuration;
    }

    fire(endpoint: string) {
      if ((this.type === "post") || (this.type === "put")) {
        if (!this.body) {
          return "404: Bad Request";
        }
      }
      const request = new XMLHttpRequest();
      request.open(this.type, endpoint, true);
      const time = new Date().getTime();
      request.onload = () => {
        if (!this.onSuccess) {
          return;
        }
        try {
          this.body = JSON.parse(request.responseText);
        } catch (error) {
          this.body = {};
        }
        if (this.minDuration) {
          this.wait(this.minDuration ? this.minDuration : 0, time).then(() => {
            this.onSuccess(this.body);
          });
        } else {
          this.onSuccess(this.body);
        }
      };
      request.onerror = () => {
        if (!this.onError) {
          return;
        }
        if (this.minDuration) {
          this.wait(this.minDuration ? this.minDuration : 0, time).then(() => {
            this.onError(request.status, request.responseText);
          });
        } else {
          this.onError(request.status, request.responseText);
        }
      };
      if (this.body instanceof Object) {
        request.setRequestHeader("Content-Type", "application/json");
        try {
          request.send(JSON.stringify(this.body));
        } catch (error) {
          request.send(null);
        }
      }
      if (Array.isArray(this.body)) {
        request.setRequestHeader("Content-Type", "application/json");
        try {
          request.send(JSON.stringify(this.body));
        } catch (error) {
          request.send(null);
        }
      }
      request.send(this.body);
    }

    async wait(duration: number, time0?: number) {
      if (!time0) {
        time0 = new Date().getTime();
      }
      const time1 = new Date().getTime();
      if (!Number.isInteger(duration)) {
        duration = 0;
      } else if (duration > time1 - time0) {
        duration = duration - (time1 - time0);
      } else {
        duration = 0;
      }
      return new Promise(resolve => setTimeout(resolve, duration));
    };
  }

  export class Get extends Request {

    constructor() {
      super("get");
    }
  }

  export class Post extends Request {

    constructor(body?: any) {
      super("post", body);
    }
  }

  class Put extends Request {

    constructor(body?: any) {
      super("put", body);
    }
  }

  // websocket

  export const createWebsocketConnection = (endpoint: string) => {
    const webSocketConnection = new WebSocketConnection(endpoint);
    connections.push(webSocketConnection);
    return webSocketConnection;
  };

  // Connection

  class Connection {
    $key: number;
    endpoint: string;
    alive: boolean;

    constructor(endpoint: string) {
      this.$key = Device.get$Key();
      this.endpoint = endpoint;
      this.alive = false;
    }
  }

  // WebSocketConnection

  class WebSocketConnection extends Connection {
    webSocket: WebSocket;

    constructor(endpoint: string) {
      super(endpoint);
      this.webSocket = new WebSocket(this.endpoint);
      this.webSocket.onopen = this.onWebSocketOpen;
      this.webSocket.onclose = this.onWebSocketClose;
    }

    onWebSocketOpen() {
      console.log('web socket open');
      this.alive = true;
    }

    onWebSocketClose(event: any) {
      if (event.wasClean) {
        console.log('clean close');
      } else {
        console.log('forced close');
      }
      this.alive = false;
    }

    fireWebSocketEvent(action: string, payload: any) {
      if (!this.alive) {
        return;
      }

      if (!this.webSocket.readyState){
        const that = this;
        setTimeout(function (){
          that.fireWebSocketEvent(action, payload);
        },100);
      } else {
        const event: any = {
          action: action
        };
        if (payload) {
          event.payload = payload;
        }
        this.webSocket.send(JSON.stringify(event));
      }
    }
  }
}

export default Network;
