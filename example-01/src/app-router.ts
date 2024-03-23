import {Button, Device, DeviceRouter, Paragraph} from "ui-kit";
import "./style.css";
import ThemesSwitch from "./themes-switch";

class AppRouter extends DeviceRouter {

  constructor() {
    super();
  }

  run(htmlElement: HTMLElement) {
    Device.run(htmlElement, this);
  }

  build() {
    let paragraph = new Paragraph("HELLO WORLD");
    this.add(paragraph);
  }
}

export default AppRouter;
