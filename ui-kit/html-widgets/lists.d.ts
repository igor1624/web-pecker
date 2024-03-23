import DeviceWidget from "../device/device-widget";
declare class List extends DeviceWidget {
    constructor(tag: string, ...params: any);
}
declare class UnorderedList extends List {
    constructor(...params: any);
}
declare class OrderedList extends List {
    constructor(...params: any);
}
declare class ListItem extends DeviceWidget {
    constructor(...params: any);
}
export { UnorderedList, OrderedList, ListItem };
