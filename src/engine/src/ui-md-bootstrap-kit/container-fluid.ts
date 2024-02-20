import {Device} from "@ui-kit/index";

class ContainerFluid extends Device.Container {

  constructor(props?: any) {
    super(props);
    this.props.className = ".container-fluid";
  }

  createHTMLElement() {
    this.getDeviceElement().createHTMLElement();
  }
}

export default ContainerFluid;
