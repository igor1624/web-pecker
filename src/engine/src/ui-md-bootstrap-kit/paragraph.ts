import {Device} from "@ui-kit/index";

class Paragraph extends Device.Container {
  text: string;

  constructor(text: string, props?: any) {
    super(props);
    this.text = text;
  }

  getType() {
    return "p";
  }

  setText(text: string) {
    this.text = text;
    this.forceUpdate();
  }

  createHTMLElement() {
    this.getDeviceElement().createHTMLElement();
    this.getDeviceElement().htmlElement.innerText = this.text;
  }
}

export default Paragraph;
