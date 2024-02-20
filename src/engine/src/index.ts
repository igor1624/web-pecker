import MyRouter from "./test1";
import test2 from "./test2";
import Device from "@ui-kit/engine/device";
import test3 from "./test3";
import bootstrap00 from "./bootstrap00";

const run = () => {
  Device.setRootHTMLElement(document.getElementById("-ui-kit"));
  //Device.getRouter().mount(MyRouter);
  // network to state
  //Device.getRouter().mount(test2());
  // network to store
  //Device.getRouter().mount(test3());
  Device.getRouter().mount(bootstrap00());
};

document.addEventListener("DOMContentLoaded", () => run());


/*
function main0() {
  const frame = new Frame();
  const label = new Label("main0");
  frame.add(label);
  const button = new Button("Press me, please!");
  frame.add(button);
  button.onClick = () => {
    label.setText("THIS IS REACTIVE PRESS");
  };
  return frame;
}*/
/*
class ChildView extends View {

  // этот фрейм будет получаться из темплейта

  constructor(base: number, counter: number, parent: ParentView) {
    super();
    let label = new Label("ChildForm");
    this.add(label);
    label = new Label("base = " + base);
    this.add(label);
    label = new Label("counter = " + counter);
    this.add(label);
    label = new Label("sum = " + (base + counter));
    this.add(label);
    let button = new Button("INCREASE COUNTER");
    this.add(button);
    button.onClick = () => {
      parent.onChildClick();
    };
  }
}

class ParentView extends View {

  // этот фрейм будет получаться из темплейта

  onChildClick: Function;
  onParentClick: Function;

  constructor(base: number, counter: number) {
    super();
    this.add(new ChildView(base, counter, this));
    let label = new Label("ParentFrame");
    this.add(label);
    const button = new Button("INCREASE BASE");
    this.add(button);
    button.onClick = () => {
      this.onParentClick();
    };
  }
}

function parent() {

  const [base, setBase] = useState(25);
  const [counter, setCounter] = useState(5);

  const frame = new Frame();
  const view = new ParentView(base, counter);
  frame.add(view);

  view.onChildClick = function() {
    setCounter(counter + 1);
    application.mount(parent);
  };
  view.onParentClick = () => {
    setBase(base + 1);
    application.mount(parent);
    //frame.requestRemount();
  };
  return frame;
}

const application = new Application();
application.onLoaded = function() {
  //application.mount(main0());
  application.mount(parent);
};
*/


/*
  const spinner = new Spinner();
  this.add(spinner);
  spinner.setSize("2rem");
  spinner.setColor("orange");

 */
