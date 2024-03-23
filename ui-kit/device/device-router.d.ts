import DeviceElement from "./device-element";
import DeviceWidget from "./device-widget";
declare class DeviceRouter extends DeviceWidget {
    static instance: DeviceRouter;
    deviceRoutes: DeviceRoute[];
    deviceRouteIndex: number;
    renderedDeviceElements: DeviceElement[];
    windowLocationPathname: string;
    windowLocationSearch: string;
    constructor(...params: any);
    removeHoverEnabled: () => void;
    build(): void;
    buildRoute(deviceRoute: DeviceRoute): void;
    handleWindowLocationChange(): void;
    navigateTo(event: any, href: string): void;
    handleResizeEvent(event: any): void;
}
declare class DeviceRoute {
    path: string;
    renderer: any;
    constructor(path: string, renderer: any);
}
declare class DeviceLink extends DeviceWidget {
    constructor(href: string, ...params: any);
    onClick: (event: any) => void;
}
export { DeviceRouter, DeviceRoute, DeviceLink };
