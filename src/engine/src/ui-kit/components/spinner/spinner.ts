import Device from "@ui-kit/engine/device";
import "./spinner.css";

class Spinner extends Device.Container {
  private size;
  private color;

  constructor(size: any, color: string, props?: any) {
    super(props);
    this.size = size;
    this.color = color;
  }

  setSize(size: string) {
    this.size = size;
    this.forceUpdate();
  }

  setColor(color: string) {
    this.color = color;
    this.forceUpdate();
  }

  createHTMLElement() {
    this.getDeviceElement().createHTMLElement();
    const htmlElement = this.mountSpinner(this.getDeviceElement().htmlElement, this.size);
    htmlElement.style.setProperty("--ui-kit-spinner-contents-color", this.color);
  }

  mountSpinner(parentHTMLElement: HTMLElement, size: any) {
    const htmlElement0 = Device.mountHTMLElement(parentHTMLElement, "div", "-ui-kit-spinner", {
      width: size, height: size
    });
    const htmlElement1 = Device.mountHTMLElement(htmlElement0, "div", "-ui-kit-spinner-contents", {
      width: size, height: size
    });
   Device. mountHTMLElement(htmlElement1, "div", "-ui-kit-spinner-contents--dot", {
      width: size, height: size
    });
    Device.mountHTMLElement(htmlElement1, "div", "-ui-kit-spinner-contents--dot", {
      width: size, height: size
    });
    Device.mountHTMLElement(htmlElement1, "div", "-ui-kit-spinner-contents--dot", {
      width: size, height: size
    });
    Device.mountHTMLElement(htmlElement1, "div", "-ui-kit-spinner-contents--dot", {
      width: size, height: size
    });
    Device.mountHTMLElement(htmlElement1, "div", "-ui-kit-spinner-contents--dot", {
      width: size, height: size
    });
    Device.mountHTMLElement(htmlElement1, "div", "-ui-kit-spinner-contents--dot", {
      width: size, height: size
    });
    return htmlElement0;
  }
}

export default Spinner;
