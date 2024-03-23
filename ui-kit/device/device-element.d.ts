import DeviceControl from "./device-control";
export declare class DeviceElement {
    static $nextKey: number;
    tag: any;
    creator: DeviceControl | Function | null;
    props: any;
    outerDeviceElement: DeviceElement;
    innerDeviceElements: DeviceElement[];
    htmlElement: HTMLElement;
    constructor(tag: any, creator: DeviceControl | Function | null, props?: any);
    createHTMLString(): any;
    createStyleString(styleProps: any): string;
    createEventHandlers(htmlElement: HTMLElement): void;
}
export default DeviceElement;
