import {Device} from "@ui-kit/index";

class Container extends Device.Container {

  constructor(type?: string, props?: any) {
    super(props);
    this.props.className = ".container" + (type ? "-" + type : "");
  }

  createHTMLElement() {
    this.getDeviceElement().createHTMLElement();
  }
}

export default Container;
