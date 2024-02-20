// https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA

import React from "@ui-kit/react";

const Person = (props: any) => {
  return (
    <div id="Person">
      <div id="Perso1n">THIS IS A PERSON:</div>
      <div id="Person2">{props.person}</div>
    </div>
  );
};

class Hello0 extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div id="Hello0">HELLO COMPONENT'S WORLD, text = {this.props.text}</div>
    );
  }
}

const Hello1 = (props: any) => {
  return (
    <div id="Hello1">
      <Hello0 text={props.text}/>
    </div>
  );
};

class Hello2 extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Hello1 text={"asdfasdf"}/>
    );
  }
}

const Hello3 = () => {
  return (
    <div id="Hello3">
      <Hello2 />
    </div>
  );
};

export default Hello3;
