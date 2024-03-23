import DeviceWidget from "../device/device-widget";
declare class Heading extends DeviceWidget {
    constructor(type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6", innerText?: string, ...params: any);
}
declare class Heading1 extends Heading {
    constructor(text?: string, ...params: any);
}
declare class Heading2 extends Heading {
    constructor(text?: string, ...params: any);
}
declare class Heading3 extends Heading {
    constructor(text?: string, ...params: any);
}
declare class Heading4 extends Heading {
    constructor(text?: string, ...params: any);
}
declare class Heading5 extends Heading {
    constructor(text?: string, ...params: any);
}
declare class Heading6 extends Heading {
    constructor(text?: string, ...params: any);
}
export { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 };
