import Control from "@ui-kit/controls/control";

class Button extends  Control {
  text: string;

  constructor(text: string, props?: any) {
    super(props);
    this.text = text;
  }

  getType() {
    return "button";
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

export default Button;
