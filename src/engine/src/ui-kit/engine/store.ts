import Device from "@ui-kit/engine/device";

const storeInstances = <Store[]>[];

// action

class Action {
  type: string;
  payload: any;

  constructor(type?: string, payload?: any) {
    this.type = type;
    this.payload = payload();
  }

  fire() {
    // browse stores for handlers
    for (let i = 0; i < storeInstances.length; i++) {
      if (storeInstances[i].onAction(this) === null) {
        break;
      }
    }
  }
}

// Store

class Store {
  private content: any;
  private consumers = <(Device.Component | Device.Container)[]>[];

  constructor() {
    storeInstances.push(this);
  }

  registerConsumer(consumer: Device.Component | Device.Container) {
    if (consumer instanceof Device.Component) {
    } else if (consumer instanceof Device.Container) {
    } else {
      return null;
    }
    for (let i = 0; i < this.consumers.length; i++) {
      if ((this.consumers[i] as any)["$key"] === (consumer as any)["$key"]) {
        // registered already
        return null;
      }
    }
    this.consumers.push(consumer);
    return consumer;
  }

  unregisterConsumer(consumer: Device.Component | Device.Container) {
    let i = 0;
    while (i < this.consumers.length) {
      if ((this.consumers[i] as any)["$key"] === (consumer as any)["$key"]) {
        this.consumers.splice(i, 1);
        // continue browsing
        continue;
      }
      i++;
    }
  }

  getContent() {
    return this.content;
  }

  setContent(content: any) {
    if (!this.content) {
      this.content = content;
    } else {
      this.content = content;
      this.forceUpdate();
    }
  }

  forceUpdate() {
    for (let i = 0; i < this.consumers.length; i++) {
      this.consumers[i].forceUpdate();
    }
  }

  onAction(action: Action): Action | null {
    return null;
  }
}

export {
  Action,
  Store
};
