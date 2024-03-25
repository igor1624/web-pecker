import DeviceElement from "./device-element";
import { DeviceStore } from "./device-store";
export declare class DeviceControl {
    static $nextKey: number;
    readonly $key: string;
    props: any;
    state: any;
    deviceElement: DeviceElement | null;
    observedShelves: ObservedShelf[];
    constructor();
    static get$Key: () => number;
    getState(): any;
    cloneState(): any;
    setState(state: any): void;
    static narrows: (object: any) => boolean;
    createDeviceElement(): DeviceElement;
    createHTMLString(): string;
    callDidMount(): void;
    mountObservedShelves(): void;
    didMount(): void;
    getDeviceElement(): DeviceElement | null;
    getHTMLElement(): HTMLElement | null | undefined;
    forceUpdate(): void;
    callWillUnmount(): void;
    unmountObservedShelves(): void;
    willUnmount(): void;
    onMouseEnter?: Function;
    onMouseMove?: Function;
    onMouseLeave?: Function;
    onPointerDown?: Function;
    onPointerUp?: Function;
    onClick?: Function;
    onResize?: Function;
}
declare class ObservedShelf {
    deviceStore: DeviceStore;
    shelfName: string;
    constructor(deviceStore: DeviceStore, shelfName: string);
}
export default DeviceControl;
