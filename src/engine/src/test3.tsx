import React from "@ui-kit/react";
import {Device, Label, Network, Spinner, Store, Button} from "@ui-kit/index";

class MyStore extends Store {

  constructor() {
    super();
    this.setContent(
      {
        network: null,
        title: null
      }
    );
  }
}


class MyContainer extends Device.Container {
  counter = 0;

  constructor() {
    super();
    this.observeStore(new MyStore());
  }

  build() {
    const label0 = new Label("label0" + this.counter);
    label0.setClassName("label0");
    label0.setStyleRule("fontSize", "2rem");
    label0.setStyleRule("color", "maroon");
    this.add(label0);

    let button = new Button("BUTTON");
    this.add(button);
    button.onClick = () => {
      label0.setText("You changed my text!");
    };

    if (!this.getStoreContent().title) {
      const spinner = new Spinner("2rem", "orange");
      this.add(spinner);
    }

    const label1 = new Label("receivedTitle = " + (this.getStoreContent().title ? this.getStoreContent().title : "waiting for network..."));
    label1.setStyleRule("fontSize", "3rem");
    label1.setStyleRule("color", "maroon");
    this.add(label1);

    button = new Button("increase counter");
    this.add(button);
    button.onClick = () => {
      this.counter++;
      this.forceUpdate();
    }
  }

  containerDidMount() {
    console.log("containerDidMount", this.constructor.name);
    if (this.getStoreContent().network === "success") {
      return;
    }

    if (this.getStoreContent().network === "loading...") {
      return;
    }

    const request = new Network.Get();

    request.onSuccess = (result: any) => {
      console.log(result);
      // set store
      const store = Object.assign({}, this.getStoreContent());
      store.network = "success";
      store.title = result.title;
      this.setStoreContent(store);
    };

    request.onError = (errorCode: any, errorMessage: any) => {
      console.log(errorCode, errorMessage);
      // set store
      const store = Object.assign({}, this.getStoreContent());
      store.network = "error";
      store.title = "network error: " + errorCode.toString() + errorMessage;
      this.setStoreContent(store);
    };

    // just to emulate network operation
    request.setMinDuration(5000);

    request.fire("https://jsonplaceholder.typicode.com/todos/1");

    // set store
    const store = Object.assign({}, this.getStoreContent());
    store.network = "loading...";
    this.setStoreContent(store);
  }
}

function test3() {
  return new MyContainer();
}

export default test3;
