import DeviceWidget from "../device/device-widget";
declare class Image extends DeviceWidget {
    constructor(source: string, ...params: any);
    setSource(source: string): void;
    setAlt(alt: string): void;
}
declare class InlineImage extends DeviceWidget {
    constructor(source: string, ...params: any);
}
export { Image, InlineImage };
