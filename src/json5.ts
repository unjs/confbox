import parse from "json5/lib/parse.js";

// Source: https://github.com/json5/json5

/**
 * Converts a [JSON5](https://json5.org/) string into an object.
 *
 * @template T The type of the return value.
 * @param text The string to parse as JSON5.
 * @param options Parsing options.
 * @returns The JavaScript value converted from the JSON5 string.
 */
export function parseJSON5<T = unknown>(
  text: string,
  options?: JSON5ParseOptions,
): T {
  return parse(text, options?.reviver) as T;
}

// --- Types ---

export interface JSON5ParseOptions {
  /**
   * A function that alters the behavior of the parsing process, or an array of
   * String and Number objects that serve as a allowlist for selecting/filtering
   * the properties of the value object to be included in the resulting
   * JavaScript object. If this value is null or not provided, all properties of
   * the object are included in the resulting JavaScript object.
   */
  reviver?: (this: any, key: string, value: any) => any;
}

export interface JSON5StringifyOptions {
  /**
   * A function that alters the behavior of the stringification process, or an
   * array of String and Number objects that serve as a allowlist for
   * selecting/filtering the properties of the value object to be included in
   * the JSON5 string. If this value is null or not provided, all properties
   * of the object are included in the resulting JSON5 string.
   */
  replacer?:
    | ((this: any, key: string, value: any) => any)
    | (string | number)[]
    | null;

  /**
   * A String or Number object that's used to insert white space into the
   * output JSON5 string for readability purposes. If this is a Number, it
   * indicates the number of space characters to use as white space; this
   * number is capped at 10 (if it is greater, the value is just 10). Values
   * less than 1 indicate that no space should be used. If this is a String,
   * the string (or the first 10 characters of the string, if it's longer than
   * that) is used as white space. If this parameter is not provided (or is
   * null), no white space is used. If white space is used, trailing commas
   * will be used in objects and arrays.
   */
  space?: string | number | null;

  /**
   * A String representing the quote character to use when serializing
   * strings.
   */
  quote?: string | null;
}
