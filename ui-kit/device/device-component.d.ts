import DeviceControl from "./device-control";
import DeviceElement from "./device-element";
export declare class DeviceComponent extends DeviceControl {
    context: any;
    refs: any;
    constructor(props?: any);
    createDeviceElement(): DeviceElement;
    render(): any;
}
export default DeviceComponent;
