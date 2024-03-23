import {Device, DeviceRouter, Paragraph} from "ui-kit";
import "./style.css";

class AppRouter extends DeviceRouter {

  constructor() {
    super();
  }

  run(htmlElement: HTMLElement) {
    Device.run(htmlElement, this);
  }

  build() {
    const paragraph = new Paragraph("HELLO WORLDS");
    this.add(paragraph);
  }
}

export default AppRouter;
