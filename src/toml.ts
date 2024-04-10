import { parse, stringify } from "smol-toml";

// Source: https://github.com/squirrelchat/smol-toml

/**
 * Converts a [TOML](https://toml.io/) string into an object.
 *
 *
 * @template T The type of the return value.
 * @param text The TOML string to parse.
 * @returns The JavaScript value converted from the TOML string.
 */
export function parseTOML<T = unknown>(text: string): T {
  return parse(text) as T;
}

/**
 * Converts a JavaScript value to a [TOML](https://toml.io/) string.
 *
 * @param value
 * @param options
 * @returns The YAML string converted from the JavaScript value.
 */
export function stringifyTOML<T = unknown>(text: string): T {
  return stringify(text) as T;
}
