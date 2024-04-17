import { getFormat, storeFormat, type FormatOptions } from "./_format";

/**
 * Converts a [JSON](https://www.json.org/json-en.html) string into an object.
 *
 * Indentation status is auto-detected and preserved when stringifying back using `stringifyJSON`
 */
export function parseJSON<T = unknown>(
  text: string,
  options?: JSONParseOptions,
): T {
  const obj = JSON.parse(text, options?.reviver);
  storeFormat(text, obj, options);
  return obj as T;
}

/**
 * Converts a JavaScript value to a [JSON](https://www.json.org/json-en.html) string.
 *
 * Indentation status is auto detected and preserved when using value from parseJSON.
 */
export function stringifyJSON(
  value: any,
  options?: JSONStringifyOptions,
): string {
  const format = getFormat(value, options);
  const str = JSON.stringify(value, options?.replacer, format.indent);
  return format.whitespace.start + str + format.whitespace.end;
}

// -- types --

export interface JSONParseOptions extends FormatOptions {
  /**
   * A function that transforms the results. This function is called for each member of the object.
   */
  reviver?: (this: any, key: string, value: any) => any;
}

export interface JSONStringifyOptions extends FormatOptions {
  /**
   * A function that transforms the results. This function is called for each member of the object.
   */
  replacer?: (this: any, key: string, value: any) => any;
}
