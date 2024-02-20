class JsonElement {
  
  isNull() {
    return false;
  }

  isBoolean() {
    return false;
  }

  asBoolean(): any {
    return undefined;
  }

  isNumber() {
    return false;
  }

  asNumber(): any {
    return undefined;
  }

  isString() {
    return false;
  }

  asString(): any {
    return undefined;
  }

  isJsonPrimitive() {
    return false;
  }

  asJsonPrimitive(): any {
    return undefined;
  }

  isJsonObject() {
    return false;
  }

  asJsonObject(): any {
    return undefined;
  }

  isJsonArray() {
    return false;
  }

  asJsonArray(): any {
    return undefined;
  }

  toString(): string {
    return "";
  }
}

export default JsonElement;
