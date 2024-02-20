import JsonElement from "@platform/json/json-element";
import JsonPrimitive from "@platform/json/json-primitive";
import JsonArray from "@platform/json/json-array";

class JsonObject extends JsonElement {
  members = new Map();

  constructor() {
    super();
  }

  isJsonObject() {
    return true;
  }

  asJsonObject() {
    return this;
  }

  size() {
    return this.members.size;
  }

  isEmpty() {
    return this.members.size === 0;
  }

  has(memberName: string) {
    return this.members.has(memberName);
  }

  keys() {
    return Array.from(this.members.keys());
  }

  add(memberName: string, value: any) {
    if (typeof value === "boolean") {
      this.members.set(memberName, new JsonPrimitive(value));
    } else if (typeof value === "number") {
      this.members.set(memberName, new JsonPrimitive(value));
    } else if (typeof value === "string") {
      this.members.set(memberName, new JsonPrimitive(value));
    } else if (value instanceof JsonElement) {
      this.members.set(memberName, value);
    } else if (value instanceof JsonObject) {
      this.members.set(memberName, value);
    } else if (value instanceof JsonArray) {
      this.members.set(memberName, value);
    } else {
      // set to null
      this.members.set(memberName, new JsonPrimitive());
    }
  }

  get(memberName: string) {
    return this.members.get(memberName);
  }

  remove(memberName: string) {
    const element = this.members.get(memberName);
    this.members.delete(memberName);
    return element;
  }

  getAsBoolean(memberName: string) {
    const element = this.get(memberName);
    if (!element) {
      return undefined;
    }
    return element.asBoolean();
  }

  getAsNumber(memberName: string) {
    const element = this.get(memberName);
    if (element == null) {
      return undefined;
    }
    return element.asNumber();
  }

  getAsJsonObject(memberName: string) {
    const element = this.get(memberName);
    if (element == null) {
      return undefined;
    }
    return element.asJsonObject();
  }

  getAsJsonArray(memberName: string) {
    const element = this.get(memberName);
    if (element == null) {
      return undefined;
    }
    return element.asJsonArray();
  }

  toString() {
    let s = "{";
    const keys = this.keys();
    for (let i = 0; i < keys.length; i++) {
      if (i > 0) {
        s += ",";
      }
      const key = keys[i];
      if (!this.get(key)) {
        continue;
      }
      s += `"${key}":`;
      const element = this.get(key);
      s += element.toString();
    }
    return s + "}";
  }
}

export default JsonObject;
