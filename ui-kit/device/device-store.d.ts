import DeviceControl from "./device-control";
declare class DeviceStore {
    protected state: any;
    shelfObserverDescriptors: ShelfObserverDescriptor[];
    constructor();
    startObservingShelf(deviceControl: DeviceControl, shelfName: string): DeviceControl | null;
    stopObservingShelf(deviceControl: DeviceControl, shelfName: string): void;
    removeObserver(deviceControl: DeviceControl): void;
    getState(): any;
    cloneState(): any;
    setState(state: any): void;
    forceUpdate(): void;
}
declare class ShelfObserverDescriptor {
    deviceControl: DeviceControl | null;
    shelfName: string;
    needsUpdate: boolean;
    constructor(deviceControl: DeviceControl, shelfName: string);
}
declare const deviceStores: DeviceStore[];
export { DeviceStore, ShelfObserverDescriptor, deviceStores };
