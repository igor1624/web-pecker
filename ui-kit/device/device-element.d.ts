export declare class DeviceElement {
    static $nextKey: number;
    tag: any;
    creator: any;
    props: any;
    outerDeviceElement: DeviceElement | undefined;
    innerDeviceElements: DeviceElement[];
    htmlElement: HTMLElement | null;
    constructor(tag: any, creator: any, props?: any);
    createHTMLString(): any;
    createStyleString(styleProps: any): string;
    createEventHandlers(htmlElement: HTMLElement): void;
}
export default DeviceElement;
