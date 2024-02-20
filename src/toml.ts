import { parse } from "toml";

// Source: https://github.com/BinaryMuse/toml-node

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
