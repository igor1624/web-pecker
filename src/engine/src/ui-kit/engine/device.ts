
namespace Device {

  let $nextKey = 0;

  export const get$Key = () => {
    let $key = $nextKey;
    if ($nextKey === Number.MAX_SAFE_INTEGER) {
      $nextKey = 0;
    } else {
      $nextKey++;
    }
    return $key;
  };

  let rootHTMLElement: HTMLElement;

  export const mountHTMLElement = (parentHTMLElement: HTMLElement, tag: any, param0?: any, param1?: any) => {
     const htmlElement = createHTMLElement(tag, param0, param1);
     parentHTMLElement.appendChild(htmlElement);
     return htmlElement;
  };

  export const createHTMLElement = (tag: any, param0?: any, param1?: any) => {
    const htmlElement = document.createElement(tag);
    if ((param0) && (typeof param0 === "string")) {
      htmlElement.className = param0;
    }

    let style: any = {};
    if (typeof param0 === "object") {
      style = param0;
    } else if (typeof param1 === "object") {
      style = param1;
    }

    Object.keys(style).forEach((name: string) => {
      htmlElement.style[name] = style[name];
    });
    return htmlElement;
  };

  export const appendHTMLElement = (parentHTMLElement: HTMLElement, htmlElement: HTMLElement) => {
    parentHTMLElement.appendChild(htmlElement);
    return htmlElement;
  };

  export const insertHTMLElementBeforeHTMLElement = (parentElement: HTMLElement, newElement: HTMLElement, existingElement: HTMLElement) => {
    parentElement.insertBefore(newElement, existingElement);
  };

  export const replaceHTMLElement = (parentHTMLElement: HTMLElement, htmlElement: HTMLElement, mountedHTMLElement: HTMLElement) => {
    if ((mountedHTMLElement) && (parentHTMLElement.contains(mountedHTMLElement))) {
      parentHTMLElement.replaceChild(htmlElement, mountedHTMLElement);
    } else {
      parentHTMLElement.appendChild(htmlElement);
    }
    return htmlElement;
  };

  export const clearHTMLElementContents = (htmlElement: HTMLElement) => {
    htmlElement.innerHTML = "";
  };

  export const removeHTMLElement = (htmlElement: HTMLElement) => {
    htmlElement.remove();
  };

  // setRootHTMLElement

  export const setRootHTMLElement = (htmlElement: HTMLElement) => {
    rootHTMLElement = htmlElement;
  };

  export const setRouter = (router: Router) => {
    Router.instance = router;
  };

  export const getRouter = () => {
    if (!Router.instance) {
      Router.instance = new Router(rootHTMLElement);
    }
    return Router.instance;
  };

  export const createDeviceElement = (type: any, props?: any, ...children: any) => {
    if (type instanceof Container) {
      type.build();
      return type.createDeviceElement();
    }

    props = props || {};
    children = Array.isArray(children[0]) ? children[0] : children;

    if (typeof type === 'function') {
      // merge props and children
      props = {...props, children: (props.children || []).concat(children)};
      let isComponent = false;
      let object: any = type;
      // can extends DeviceComponent from DeviceComponent
      while ((object) && object.prototype) {
        if (object.prototype instanceof Component) {
          isComponent = true;
          break;
        }
        object = object.prototype;
      }
      if (isComponent) {
        const deviceComponent = new type(props);
        // call render to get DeviceElement
        const deviceElement = deviceComponent.render(props);
        deviceElement.setCreator(deviceComponent);
        return deviceElement;
      }
      return type(props);
    }

    const deviceElement = new Element(type, props);
    if (children) {
      children.forEach((child: any) => {
        if (child == null) {
        } else if (child === true) {

        } else if (child === false) {
        } else if (child instanceof Element) {
          deviceElement.children.push(child);
        } else {
          // html
          deviceElement.children.push(new Element("-text", child));
        }
      });
    }

    return deviceElement;
  };

  const mountDeviceElement = (parentHTMLElement: HTMLElement, deviceElement: Element) => {
    if (deviceElement.type === "-text") {
      parentHTMLElement.appendChild(document.createTextNode(deviceElement.props));
      return;
    }
    if ((deviceElement.creator) && (deviceElement.creator instanceof Container)) {
      deviceElement.creator.createHTMLElement();
    } else {
      deviceElement.createHTMLElement();
    }
    appendHTMLElement(parentHTMLElement, deviceElement.htmlElement);

    deviceElement.children.forEach((child: Element) => {
      mountDeviceElement(deviceElement.htmlElement, child)
    });
  };

  const updateDeviceElement = (parentHTMLElement: HTMLElement, deviceElement: Element, mountedHTMLElement: HTMLElement) => {
    if (deviceElement.type === "-text") {
      parentHTMLElement.appendChild(document.createTextNode(deviceElement.props));
      return;
    }
    if ((deviceElement.creator) && (deviceElement.creator instanceof Container)) {
      deviceElement.creator.createHTMLElement();
    } else {
      deviceElement.createHTMLElement();
    }
    // replace
    replaceHTMLElement(parentHTMLElement, deviceElement.htmlElement, mountedHTMLElement);

    deviceElement.children.forEach((child: Element) => {
      mountDeviceElement(deviceElement.htmlElement, child)
    });
  };

  // Element

  export class Element {

    $key: number;
    type: any;
    props: any;
    creator: any;

    children = <Element[]>[];

    htmlElement: HTMLElement;

    constructor(type: any, props?: any) {
      this.$key = get$Key();
      this.type = type;
      this.props = props;
    }

    setCreator(creator: any) {
      this.creator = creator;
      this.creator["deviceElement"] = this;
    }

    createHTMLElement() {
      this.htmlElement = document.createElement(this.type);
      this.htmlElement.setAttribute("data-device-key", this.$key.toString());

      const that = this;

      if (this.creator) {
        const s = `${this.creator.constructor.name}:${(this.creator as any)["$key"]}`;
        this.htmlElement.setAttribute("data-creator-key", s);
        if (this.creator instanceof Container) {
          if (this.creator.onClick) {
            this.htmlElement.addEventListener("click", function(event: any) {
              that.creator.onClick(event);
            });
          }
        }
      }

      Object.keys(this.props || {}).forEach((propName) => {
        if (propName === "style") {
          Object.keys(this.props[propName]).forEach((styleProp: string) => {
            (this.htmlElement.style as any)[styleProp] = this.props.style[styleProp];
          })
        } else if (typeof this.props[propName] === "function") {
          if (propName.indexOf("on") === 0) {
            const handlerName = propName.substring(2).toLowerCase();
            this.htmlElement.addEventListener(handlerName, function(event: any) {
              that.props[propName](event);
            });
          } else {
            // TO DO - data-
          }
        } else {
          (this.htmlElement as any)[propName] = this.props[propName];
        }
      });
    }
  }

  // Component

  export class Component {
    private $key: number;

    props: any;
    state: any;
    private store: any;

    // unusable: just to stop babel complaining

    context: any;
    refs: any;

    private deviceElement: Element;

    constructor(props?: any) {
      this.$key = get$Key();
      this.props = props || {};
    }

    setState(state: any) {
      this.state = state;
      this.forceUpdate();
    }

    forceUpdate() {
      if (this.deviceElement) {
        // mounted to device
        getRouter().update(this);
      }
    }

    getStore() {
      return this.store;
    }

    observeStore(store: any) {
      this.store = store;
    }

    getStoreContent() {
      if (this.store) {
        return this.store.getContent();
      }
      return null;
    }

    setStoreContent(storeContent: any) {
      if (this.store) {
        this.store.setContent(storeContent);
      }
    }

    render(): any {
      return new Element("div");
    }

    componentDidMount() {
      console.log("deviceComponentDidMount", this.constructor.name)
    }

    componentWillUnmount() {
      console.log("deviceComponentWillUnmount", this.constructor.name)
    }
  }

  // Container

  export class Container {
    private $key: number;

    protected props: any;
    protected state: any;
    private store: any;
    private children: any[];

    private deviceElement: Element;

    onClick: Function;

    constructor(props?: any) {
      this.$key = get$Key();
      this.props = props || {};
    }

    getType() {
      return "div";
    }

    getClassName(): string {
      return this.props.className;
    }

    setClassName(className: string) {
      this.props.className = className;
      this.forceUpdate();
    }

    getStyle(): string {
      return this.props.style || {};
    }

    setStyle(style: any) {
      this.props.style = style;
      this.forceUpdate();
    }

    getStyleRule(ruleName: string): string {
      const style = this.props.style || {};
      return style[ruleName];
    }

    setStyleRule(ruleName: string, ruleValue: string) {
      this.props.style = this.props.style || {};
      this.props.style[ruleName] = ruleValue;
      this.forceUpdate();
    }

    getColor() {
      if (this.props.style) {
        return this.props.style.color;
      }
      return undefined;
    }

    setColor(color: string) {
      this.props.style = this.props.style || {};
      this.props.style.color = color;
      this.forceUpdate();
    }

    getBackgroundColor() {
      if (this.props.style) {
        return this.props.style.backgroundColor;
      }
      return undefined;
    }

    setBackgroundColor(backgroundColor: string) {
      this.props.style = this.props.style || {};
      this.props.style.backgroundColor = backgroundColor;
      this.forceUpdate();
    }

    getFontSize() {
      if (this.props.style) {
        return this.props.style.fontSize;
      }
      return undefined;
    }

    setFontSize(fontSize: string) {
      this.props.style = this.props.style || {};
      this.props.style.fontSize = fontSize;
      this.forceUpdate();
    }

    getState() {
      return this.state;
    }

    setState(state: any) {
      this.state = state;
      this.forceUpdate();
    }

    forceUpdate() {
      if (this.deviceElement) {
        // mounted to device
        getRouter().update(this);
      }
    }

    getStore() {
      return this.store;
    }

    observeStore(store: any) {
      this.store = store;
    }

    getStoreContent() {
      if (this.store) {
        return this.store.getContent();
      }
      return null;
    }

    setStoreContent(storeContent: any) {
      if (this.store) {
        this.store.setContent(storeContent);
      }
    }

    getChildren() {
      return this.children;
    }

    add(child: any) {
      if (!this.children) {
        this.children = [child];
      } else {
        this.children.push(child);
      }
    }

    removeAll() {
      this.children = undefined;
    }

    getDeviceElement() {
      return this.deviceElement;
    }

    getHTMLElement() {
      if (!this.deviceElement) {
        return null;
      }
      return this.deviceElement.htmlElement;
    }

    createDeviceElement() {
      this.deviceElement = new Element(this);
      this.deviceElement.setCreator(this);

      this.deviceElement.type = this.getType();
      this.deviceElement.props = {...this.props};

      if (this.children) {
        this.children.forEach((child: any) => {
          if (child instanceof Element) {
            // is ready-to-go element
            this.deviceElement.children.push(child);
          } else if (child instanceof Container) {
            const deviceElement = child.createDeviceElement();
            this.deviceElement.children.push(deviceElement);
          }
        });
      }
      return this.deviceElement;
    }

    build(): void {
    }

    createHTMLElement() {
      this.getDeviceElement().createHTMLElement();
    }

    alignInHTMLElement(width: number, height: number) {
      console.log("alignInHTMLElement", this.constructor.name, width, height)
    }

    containerDidMount() {
      console.log("deviceContainerDidMount", this.constructor.name)
    }

    containerWillUnmount() {
      console.log("deviceContainerWillUnmount", this.constructor.name)
    }
  }

  // Router

  export class Router {
    static instance: Router;

    protected rootHTMLElement: HTMLElement;
    protected windowElements: WindowElement[] = [];

    constructor(rootHTMLElement: HTMLElement) {
      this.rootHTMLElement = rootHTMLElement;
    }

    mount(target: any, overlapped = false) {
      let windowElement = new WindowElement("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }
      });
      windowElement.overlapped = overlapped;
      let deviceElement;
      if (target instanceof Container) {
        // "thick" component
        deviceElement = createDeviceElement(target);
      } else if (target instanceof Component) {
        // functional component
        deviceElement = target;
      } else {
        // component
        deviceElement = createDeviceElement(target);
      }
      windowElement.children.push(deviceElement);

      if ((this.windowElements.length === 0) || (windowElement.overlapped)) {
        // bring component to top
        this.windowElements.push(windowElement);
        mountDeviceElement(this.rootHTMLElement, windowElement);
        this.passDidMount(deviceElement);
        return;
      }

      /*this.windowElements.unshift(windowElement);
      insertHTMLElementBeforeHTMLElement(this.rootHTMLElement, windowElement.htmlElement, this.windowElements[1].htmlElement);
      mountDeviceElement(windowElement.htmlElement, windowElement.rootDeviceElement);
      windowElement = this.windowElements[1];
      if (windowElement.overlapped) {
        return;
      }
      unmountDeviceElement(windowElement.rootDeviceElement);
      this.windowElements.splice(1, 1);
      windowElement.htmlElement.remove();*/
    }

    passDidMount(deviceElement: Element) {
      const browseDeviceElements = (deviceElement: Element) => {
        if (deviceElement.creator instanceof Container) {
          const rect = deviceElement.htmlElement.getBoundingClientRect();
          deviceElement.creator.alignInHTMLElement(rect.width, rect.height);
        }
        deviceElement.children.forEach((child: any) => {
          browseDeviceElements(child);
        });
        if (deviceElement.creator instanceof Component) {
          if (deviceElement.creator.getStore()) {
            deviceElement.creator.getStore().registerConsumer(deviceElement.creator);
          }
          deviceElement.creator.componentDidMount();
        } else if (deviceElement.creator instanceof Container) {
          if (deviceElement.creator.getStore()) {
            deviceElement.creator.getStore().registerConsumer(deviceElement.creator);
          }
          deviceElement.creator.containerDidMount();
        }
      };
      browseDeviceElements(deviceElement);
    }

    unmount() {

    };

    update(target: any) {
      let parentDeviceElement: Element;
      let index: number;
      for (let i = 0; i < this.windowElements.length; i++) {
        const windowElement = this.windowElements[i];
        const browseDeviceElements = (deviceElement: Element) => {
          for (let i = 0; i < deviceElement.children.length; i++) {
            if (deviceElement.children[i].$key === target.deviceElement.$key) {
              parentDeviceElement = deviceElement;
              index = i;
              return;
            }
            browseDeviceElements(deviceElement.children[i]);
            if (parentDeviceElement) {
              return;
            }
          }
        };
        browseDeviceElements(windowElement);
        if (parentDeviceElement) {
          break;
        }
      }
      if (!parentDeviceElement) {
        console.error("update target not found", target["$key"]);
        return;
      }
      const htmlElement = target.deviceElement.htmlElement;
      this.passWillUnmount(target.deviceElement);
      clearHTMLElementContents(htmlElement);
      if (target instanceof Container) {
        target.removeAll();
        target.build();
        target.createDeviceElement();
      } else {
        target.deviceElement = target.render();
        target.deviceElement.setCreator(target);
      }

      parentDeviceElement.children[index] = target.deviceElement;
      updateDeviceElement(parentDeviceElement.htmlElement, target.deviceElement, htmlElement);
      this.passDidMount(target.deviceElement);
    };

    passWillUnmount(deviceElement: Element) {
      const browseDeviceElements = (deviceElement: Element) => {
        deviceElement.children.forEach((child: any) => {
          browseDeviceElements(child);
        });
        if (!deviceElement.creator) {
          return;
        }
        if (deviceElement.creator instanceof Component) {
          deviceElement.creator.componentWillUnmount();
          if (deviceElement.creator.getStore()) {
            deviceElement.creator.getStore().unregisterConsumer(deviceElement.creator);
          }
        } else if (deviceElement.creator instanceof Container) {
          deviceElement.creator.containerWillUnmount();
          if (deviceElement.creator.getStore()) {
            deviceElement.creator.getStore().unregisterConsumer(deviceElement.creator);
          }
        }

        // break connections
        deviceElement.creator.deviceElement = null;
        deviceElement.creator = null;
        deviceElement.htmlElement = null;
      };

      browseDeviceElements(deviceElement);
    };
  }

  // WindowElement

  class WindowElement extends Element {
    overlapped: boolean;
    mousedDeviceElement: Element = null;
    focusedDeviceElement: Element = null;
  }
}

export default Device;
