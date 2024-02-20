import Device from "@ui-kit/engine/device";

class Label extends Device.Container {
  text: string;

  constructor(text: string, props?: any) {
    super(props);
    this.text = text;
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

export default Label;

