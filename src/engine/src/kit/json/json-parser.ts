import JsonPrimitive from "@platform/json/json-primitive";
import JsonObject from "@platform/json/json-object";
import JsonArray from "@platform/json/json-array";

class JsonParser {

  parse(input: string, parserState?: any) {
    if (!parserState) {
      parserState = {
        inputIndex: 0,
        lineNumber: 0,
        lineIndex: 0
      };
    }
    if (!parserState.inputIndex) {
      parserState.inputIndex = 0;
    }
    if (!parserState.lineNumber) {
      parserState.lineNumber = 0;
    }
    if (!parserState.lineIndex) {
      parserState.lineIndex = 0;
    }
    try {
      return this.parseJsonElement(input, parserState);
    } catch (exception) {
      return undefined;
    }
  }

  parseJsonElement(input: string, parserState: any) {
    this.skipWhitespaces(input, parserState);
    const element = this.parseJsonValue(input, parserState);
    this.skipWhitespaces(input, parserState);
    return element;
  }

  parseJsonValue(input: string, parserState: any) {
    let element: any = this.parseJsonObject(input, parserState);
    if (element !== undefined) {
      return element;
    }
    element = this.parseJsonArray(input, parserState);
    if (element !== undefined) {
      return element;
    }
    const s = this.parseString(input, "\"", parserState);
    if (s !== undefined) {
      return new JsonPrimitive(s);
    }
    const n = this.parseNumber(input, parserState);
    if (n !== undefined) {
      return new JsonPrimitive(n);
    }
    element = this.parseLiteral(input, parserState);
    if (element !== undefined) {
      return element;
    }
    throw new ParseException("syntax-error", ParseException.SYNTAX_ERROR, parserState.inputIndex);
  }

  parseJsonObject(input: string, parserState: any) {
    try {
      if (input.charAt(parserState.inputIndex) !== '{') {
        return undefined;
      }

      parserState.inputIndex++;
      const object = new JsonObject();
      this.skipWhitespaces(input, parserState);
      if (input.charAt(parserState.inputIndex) === '}') {
        parserState.inputIndex++;
        return object;
      }

      while (true) {
        this.parseJsonObjectMember(object, input, parserState);
        if (input.charAt(parserState.inputIndex) === ',') {
          parserState.inputIndex++;
          continue;
        }
        break;
      }
      this.skipWhitespaces(input, parserState);
      if (input.charAt(parserState.inputIndex) === '}') {
        parserState.inputIndex++;
      }
      return object;
    } catch (exception) {
      throw new ParseException("end-of-input-error", ParseException.END_OF_INPUT_ERROR, parserState.inputIndex);
    }
  }

  parseJsonObjectMember(object: JsonObject, input: string, parserState: any) {
    try {
      this.skipWhitespaces(input, parserState);
      const name = this.parseString(input, "\"", parserState);
      if (name === undefined) {
        return;
      }
      this.skipWhitespaces(input, parserState);
      if (input.charAt(parserState.inputIndex) === ':') {
        parserState.inputIndex++;
        const element = this.parseJsonElement(input, parserState);
        object.add(name, element);
      }
    } catch (exception) {
      throw new ParseException("end-of-input-error", ParseException.END_OF_INPUT_ERROR, parserState.inputIndex);
    }
  }

  parseJsonArray(input: string, parserState: any) {
    try {
      if (input.charAt(parserState.inputIndex) !== '[') {
        return undefined;
      }
      parserState.inputIndex++;
      const array = new JsonArray();
      this.skipWhitespaces(input, parserState);
      while (parserState.inputIndex < input.length) {
        if (input.charAt(parserState.inputIndex) === ']') {
          break;
        }
        const node = this.parseJsonElement(input, parserState);
        array.add(node);
        if (input.charAt(parserState.inputIndex) !== ',') {
          break;
        }
        parserState.inputIndex++;
      }
      parserState.inputIndex++;
      return array;
    } catch (exception) {
      throw new ParseException("end-of-input-error", ParseException.END_OF_INPUT_ERROR, parserState.inputIndex);
    }
  }

  parseString(input: string, stringDelimiter: string, parserState: any) {
    try {
      if (input.charAt(parserState.inputIndex) !== stringDelimiter) {
        return undefined;
      }
      let i = parserState.inputIndex + 1;
      while (true) {
        i = input.indexOf(stringDelimiter, i);
        if (i < 0) {
          // error
          throw new ParseException("syntax-error", ParseException.SYNTAX_ERROR, parserState.inputIndex);
        }
        if (input.charAt(i - 1) === "\\") {
          i++;
          continue;
        }
        const s = input.substring(parserState.inputIndex + 1, i);
        parserState.inputIndex = i + 1;
        return s;
      }
    } catch (exception) {
      throw new ParseException("end-of-input-error", ParseException.END_OF_INPUT_ERROR, parserState.inputIndex);
    }
  }

  parseNumber(input: string, parserState: any){
    let s = "";
    try {
      let c = input.charAt(parserState.inputIndex);
      if ((c >= '0') && (c <= '9')) {
      } else if (c === '-') {
      } else {
        return undefined;
      }
      s += c;
      parserState.inputIndex++;
      while (parserState.inputIndex < input.length) {
        c = input.charAt(parserState.inputIndex);
        if ((c >= '0') && (c <= '9')) {
        } else if (c === '.') {
        } else {
          break;
        }
        s += c;
        parserState.inputIndex++;
      }
    } catch (exception) {
      throw new ParseException("end-of-input-error", ParseException.END_OF_INPUT_ERROR, parserState.inputIndex);
    }
    try {
      return parseFloat(s);
    } catch (error) {
    }
    try {
      return parseInt(s);
    } catch (error) {
    }
    return undefined;
  }

  parseLiteral(input: string, parserState: any) {
    try {
      if (input.indexOf("null", parserState.inputIndex) === parserState.inputIndex) {
        parserState.inputIndex += 4;
        return new JsonPrimitive(null);
      }
      if (input.indexOf("false", parserState.inputIndex) === parserState.inputIndex) {
        parserState.inputIndex += 5;
        return new JsonPrimitive(false);
      }
      if (input.indexOf("true", parserState.inputIndex) === parserState.inputIndex) {
        parserState.inputIndex += 4;
        return new JsonPrimitive(true);
      }
      return undefined;
    } catch (exception) {
      throw new ParseException("end-of-input-error", ParseException.END_OF_INPUT_ERROR, parserState.inputIndex);
    }
  }

  skipWhitespaces(input: string, parserState: any){
    while (parserState.inputIndex < input.length) {
      let c = input.charAt(parserState.inputIndex);
      if (c === "\r") {
        c = "\n";
        if (parserState.inputIndex + 1 < input.length) {
          if (input.charAt(parserState.inputIndex + 1) === "\n") {
            parserState.inputIndex++;
            parserState.lineIndex++;
          }
        }
      }
      switch (c) {
        case "\n":
          parserState.inputIndex++;
          parserState.lineNumber++;
          parserState.lineIndex = 0;
          continue;
        case "\t":
        case " ":
          parserState.inputIndex++;
          parserState.lineIndex++;
          continue;
      }
      return true;
    }
    return false;
  }
}

class ParseException extends Error {
  static END_OF_INPUT_ERROR = 1;
  static SYNTAX_ERROR = 2;
  code;
  inputIndex;

  constructor(message: string, code: number, inputIndex: number) {
    super(message);
    this.code = code;
    this.inputIndex = inputIndex;
  }
}

export default JsonParser;
