import { parse } from "toml";

// Source: https://github.com/sunnyadn/js-toml

/**
 * Converts a [TOML](https://toml.io/) string into an object.
 *
 *
 * @template T The type of the return value.
 * @param text The TOML string to parse.
 * @returns The JavaScript value converted from the TOML string.
 */
export function parseToml<T = unknown>(text: string): T {
  return parse(text) as T;
}
