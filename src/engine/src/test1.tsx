import React from "@ui-kit/react";

const Person = (props: any) => {
  return (
    <div>
      <div>THIS IS A PERSON:</div>
      <div>{props.person}</div>
    </div>
  );
};

const View = (props: any) => {
  return (
    <div style={{backgroundColor: "indigo", color: "white"}}>
      VIEW
      <button onClick={() => props.onBaseClick()}>BASE++</button>
      <button onClick={() => props.onCounterClick()}>COUNTER++</button>
      <div>base = {props.base} </div>
      <div>counter = {props.counter} </div>
      <div>sum = {props.base + props.counter} </div>
      <div>PEOPLE</div>
      <ul>
        {props.people.map((person: any) => {
          return <Person key={person} person={person} />
        })}
      </ul>
    </div>
  );
};

class Counter extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      counter: 1,
      people: [
        "Ivanov",
        "Petrov",
        "Sidorov"
      ]
    }
  }

  render() {
    return (
      <div style={{backgroundColor: "tan"}}>
        <div>counter = {this.state.counter}</div>
        <View
          base={this.props.base}
          counter={this.state.counter}
          people={this.state.people}
          onBaseClick={this.props.onBaseClick}
          onCounterClick={this.onCounterClick}
        />
      </div>
    );
  }

  onCounterClick = () => {
    const state ={... this.state};
    state.counter = state.counter + 1;
    state.people.push("NEW PERSON " + state.counter);
    this.setState(state);
  };

  componentDidMount() {
    console.log("Counter DID mount");
  }

  componentDidUpdate() {
    console.log("Counter DID update");
  }

  componentWillUnmount() {
    console.log("Conter WILL unmount");
  }
}

class Base extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      base: 11
    }
  }

  render() {
    return (
      <div style={{backgroundColor: "teal"}}>
        <div>base = {this.state.base}</div>
        <Counter base={this.state.base} onBaseClick={this.onBaseClick}/>
      </div>
    );
  }

  onBaseClick = () => {
    this.setState({
      base: this.state.base + 1
    });
  };

  componentDidMount() {
    console.log("Base DID mount");
  }

  componentDidUpdate() {
    console.log("Base DID update");
  }

  componentWillUnmount() {
    console.log("Base WILL unmount");
  }
}

class DummyPage extends React.Component {

  render() {
    return (
      <div style={{backgroundColor: "magenta"}}>DUMMY PAGE</div>
    );
  }
}

class MyRouter extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      page: 0
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setPage(0)}>PAGE 0</button>
        <button onClick={() => this.setPage(1)}>PAGE 1</button>
        {this.state.page === 0 &&
        <Base />
        }
        {this.state.page !== 0 &&
        <DummyPage />
        }
      </div>
    )
  }

  setPage = (page: any) => {
    this.setState({page: page});
  };

  componentDidMount() {
    console.log("Router DID mount");
  }

  componentDidUpdate() {
    console.log("Router DID update");
  }

  componentWillUnmount() {
    console.log("Router WILL unmount");
  }
}

export default MyRouter;
