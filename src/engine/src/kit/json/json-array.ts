import JsonElement from "@platform/json/json-element";
import JsonPrimitive from "@platform/json/json-primitive";

class JsonArray extends JsonElement {
  elements: any[] = [];

  isJsonArray() {
    return true;
  }

  asJsonArray() {
    return this;
  }

  length() {
    return this.elements.length;
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  add(value: any) {
    if (value === null) {
      this.elements.push(new JsonPrimitive());
    } else if (value instanceof JsonElement) {
      this.elements.push(value);
    } else if (value instanceof JsonArray) {
      this.elements.push(...value.elements);
    } else {
      this.elements.push(new JsonPrimitive(value));
    }
  }

  set(index: number, element0: any) {
    const element1 = element0 === null ? new JsonPrimitive() : element0;
    return this.elements.splice(index, 1, element1)[0];
  }

  remove(index: number) {
    return this.elements.splice(index, 1)[0];
  }

  get(index: number) {
    return this.elements[index];
  }

  getAsBoolean(index: number) {
    const element = this.get(index);
    if (element === null) {
      return undefined;
    }
    return element.asBoolean();
  }

  getAsNumber(index: number) {
    const element = this.get(index);
    if (element === null) {
      return undefined;
    }
    return element.asNumber();
  }

  getAsJsonObject(index: number) {
    const element = this.get(index);
    if (element === null) {
      return undefined;
    }
    return element.asJsonObject();
  }

  getAsJsonArray(index: number) {
    const element = this.get(index);
    if (element === null) {
      return undefined;
    }
    return element.asJsonArray();
  }

  toString() {
    let s = "[";
    for (let i = 0; i < this.length(); i++) {
      if (i > 0) {
        s += ",";
      }
      const element = this.get(i);
      if (element) {
        s += element.toString();
      }
    }
    return s + "]";
  }
}

export default JsonArray;
