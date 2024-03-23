import DeviceElement from "./device-element";
declare namespace Device {
    const debounce: (callback: any, delay: number) => (...args: any) => void;
    const throttle: (callback: any, delay: number) => (...args: any) => void;
    const textToHTML: (text: any) => any;
    const getWidth: () => number;
    const getHeight: () => number;
    const run: (htmlElement: HTMLElement, object: any) => void;
    const createDeviceElement: (object: any, props?: any, ...children: any) => any;
    const mountHTMLString: (parentHTMLElement: HTMLElement, htmlString: string, object: any) => void;
    const updateDeviceElement: (deviceElement: DeviceElement) => void;
}
export default Device;
