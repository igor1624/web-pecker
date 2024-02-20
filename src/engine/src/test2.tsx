import React from "@ui-kit/react";
import {Device, Label, Network} from "../ui-kit";

const Button = (props: any) => {
  return (
    <div>
      <p>THIS IS A BUTTON</p>
      <button onClick={() => props.onClick()}>{props.text}</button>
    </div>
  );
};

class MyContainer extends Device.Container {

  constructor() {
    super();
    this.setState(
      {
        counter: 0,
        network: null,
        title: null
      }
    );
  }

  build() {
    const label0 = new Label("label0" + this.state.counter);
    label0.setClassName("label0");
    label0.setStyleRule("fontSize", "2rem");
    label0.setStyleRule("color", "tan");
    this.add(label0);
    this.add(Button({
      text: "set label text",
      onClick: () => {
        label0.setText("dfdd");
      }
    }));
    const label1 = new Label("receivedTitle = " + (this.state.title ? this.state.title : "waiting for network..."));
    label1.setStyleRule("fontSize", "3rem");
    label1.setStyleRule("color", "tan");
    this.add(label1);
    this.add(Button({
      text: "increase counter",
      onClick: () => {
        const state = Object.assign({}, this.state);
        state.counter = state.counter + 1;
        this.setState(state);
      }
    }));
  }

  containerDidMount() {
    if (this.state.network === "success") {
      return;
    }

    if (this.state.network === "loading...") {
      return;
    }

    const request = new Network.Get();

    request.onSuccess = (result: any) => {
      console.log(result);
      // clone state
      const state = Object.assign({}, this.state);
      state.network = "success";
      state.title = result.title;
      this.setState(state);
    };

    request.onError = (errorCode: any, errorMessage: any) => {
      console.log(errorCode, errorMessage);
      // clone state
      const state = Object.assign({}, this.state);
      state.network = "error";
      state.title = "network error: " + errorCode.toString() + errorMessage;
      this.setState(state);
    };

    request.setMinDuration(1000);

    request.fire("https://jsonplaceholder.typicode.com/todos/1");
    this.setState({
      counter: this.state.counter,
      network: "loading...",
      title: null
    });
  }
}

function test2() {
  return new MyContainer();
}

export default test2;
