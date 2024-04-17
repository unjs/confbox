import { getFormat, storeFormat } from "./_format";
import { parse, stringify } from "smol-toml";

// Source: https://github.com/squirrelchat/smol-toml

/**
 * Converts a [TOML](https://toml.io/) string into an object.
 *
 * @NOTE Comments and indentation is not preserved after parsing.
 *
 * @template T The type of the return value.
 * @param text The TOML string to parse.
 * @returns The JavaScript value converted from the TOML string.
 */
export function parseTOML<T = unknown>(text: string): T {
  const obj = parse(text);
  storeFormat(text, obj, { preserveIndentation: false });
  return obj as T;
}

/**
 * Converts a JavaScript value to a [TOML](https://toml.io/) string.
 *
 * @NOTE Comments and indentation is not preserved in the output.
 *
 * @param value
 * @param options
 * @returns The YAML string converted from the JavaScript value.
 */
export function stringifyTOML(value: any): string {
  const format = getFormat(value, { preserveIndentation: false });
  const str = stringify(value);
  return format.whitespace.start + str + format.whitespace.end;
}
