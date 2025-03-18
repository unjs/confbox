import { storeFormat, type FormatOptions } from "./_format";
import stripeJSONComments from "strip-json-comments";
import { stringifyJSON } from "./json";

// Source: https://github.com/microsoft/node-jsonc-parser

/**
 *
 * Converts a [JSONC](https://github.com/microsoft/node-jsonc-parser) string into an object.
 *
 * @NOTE On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 *
 * @NOTE Comments and trailing commas are not preserved after parsing.
 *
 * @template T The type of the return value.
 * @param text The string to parse as JSONC.
 * @param options Parsing options.
 * @returns The JavaScript value converted from the JSONC string.
 */
export function parseJSONC<T = unknown>(
  text: string,
  options?: JSONCParseOptions,
): T {
  const obj = JSON.parse(
    stripeJSONComments(text, {
      trailingCommas: options?.allowTrailingComma,
    }),
  );
  storeFormat(text, obj, options);
  return obj as T;
}

/**
 * Converts a JavaScript value to a [JSONC](https://github.com/microsoft/node-jsonc-parser) string.
 *
 * @NOTE Comments and trailing commas are not preserved in the output.
 *
 * @param value
 * @param options
 * @returns The JSON string converted from the JavaScript value.
 */
export function stringifyJSONC(
  value: any,
  options?: JSONCStringifyOptions,
): string {
  return stringifyJSON(value, options);
}

// --- Types ---

export interface JSONCParseOptions extends FormatOptions {
  allowTrailingComma?: boolean;
}

export interface JSONCStringifyOptions extends FormatOptions {}
