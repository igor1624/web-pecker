import DeviceElement from "./device-element";
import DeviceControl from "./device-control";
declare class DeviceWidget extends DeviceControl {
    readonly tag: string;
    classNames: string[];
    children: any[];
    innerText: string;
    innerHTML: string;
    scrollBarsHolderDeviceElement: ScrollBarsHolderDeviceElement;
    scrollableContentDeviceElement: DeviceElement;
    constructor(tag: string, ...params: any);
    getTag(): string;
    getClassName(): string;
    hasClassName(className: string): boolean;
    addClassName(className: string): void;
    removeClassName(className: string): void;
    toggleClassName(className: string): void;
    resetClassName(): void;
    getStyle(): any;
    setStyle(style: any): void;
    getStyleRule(ruleName: string): any;
    setStyleRule(ruleName: string, ruleValue: string): void;
    setProp(propName: string, propValue: string): void;
    getChildren(): any[];
    add(child: any): any;
    removeAll(): void;
    getInnerText(): string;
    setInnerText(innerText: string): void;
    getInnerHTML(): string;
    setInnerHTML(innerHTML: string): void;
    createDeviceElement(): DeviceElement;
    createInnerDeviceElements(parentDeviceElement: DeviceElement): void;
    createHTMLString(): any;
    createScrollBars(): void;
    mountDeviceElement(parentHTMLElement: HTMLElement): void;
    createDeviceHTMLElement(parentHTMLElement: HTMLElement): void;
    callDidMount(): void;
    getBoundingClientRect(): DOMRect;
}
declare class ScrollBarsHolderDeviceElement extends DeviceElement {
    deviceWidget: DeviceWidget;
    overflow: "y-auto" | "x-auto" | "y-scroll" | "x-scroll" | "auto" | "scroll";
    htmlVerticalScrollBar: HTMLElement;
    htmlHorizontalScrollBar: HTMLElement;
}
export default DeviceWidget;
