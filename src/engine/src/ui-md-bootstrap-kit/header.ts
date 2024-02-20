import {Device} from "@ui-kit/index";

class Header extends Device.Container {
  private readonly type: string;
  text: string;

  constructor(type: string, text: string, props?: any) {
    super(props);
    this.type = type;
    this.text = text;
  }

  getType() {
    return this.type;
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

export default Header;

