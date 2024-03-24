import {Device, DeviceRouter, Div, Paragraph, SpinnerBorder} from "ui-kit";
import "./style.css";

class AppRouter extends DeviceRouter {

  constructor() {
    super();
  }

  run(htmlElement: HTMLElement) {
    Device.run(htmlElement, this);
  }

  build() {
    let paragraph = new Paragraph("HELLO WORLD 2");
    this.add(paragraph);
    paragraph = new Paragraph("HELLO WORLD 2", this);
  }

  handleClick() {
    console.log("CLICKED");
  }
}

export default AppRouter;
