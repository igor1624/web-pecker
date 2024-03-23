import DeviceWidget from "../device/device-widget";
declare class Span extends DeviceWidget {
    text: string;
    constructor(innerText: string, ...params: any);
}
export default Span;
