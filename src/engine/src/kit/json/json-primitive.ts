import JsonElement from "@platform/json/json-element";

class JsonPrimitive extends JsonElement {
  value;

  constructor(value?: any) {
    super();
    if (typeof value === "undefined") {
      return;
    }
    this.value = null;
    if (typeof value === "boolean") {
      this.value = value;
    } else if (typeof value === "number") {
      this.value = value;
    } else if (typeof value === "string") {
      this.value = value;
    }
  }

  isNull() {
    return this.value === null;
  }

  isBoolean() {
    return typeof this.value === 'boolean';
  }

  asBoolean() {
    if (typeof this.value === 'boolean') {
      return this.value;
    }
    return undefined;
  }

  isNumber() {
    return typeof this.value === 'number';
  }

  asNumber() {
    if (typeof this.value === 'number') {
      return this.value;
    }
    return undefined;
  }

  isString() {
    return typeof this.value === 'string';
  }

  asString() {
    if (typeof this.value === 'boolean') {
      return this.value.toString();
    }
    if (typeof this.value === 'number') {
      return this.value.toString();
    }
    if (typeof this.value === 'string') {
      return this.value;
    }
    return undefined;
  }

  isJsonPrimitive() {
    return true;
  }

  asJsonPrimitive() {
    return this;
  }

  toString() {
    if (this.isNull()) {
      return "null";
    }
    if (typeof this.value === "boolean") {
      if (this.value) {
        return "true";
      } else {
        return "false";
      }
    } else if (typeof this.value === "number") {
      return this.value.toString();
    } else if (typeof this.value === "string") {
      return `"${this.value}"`;
    }
    return "undefined";
  }
}

export default JsonPrimitive;
