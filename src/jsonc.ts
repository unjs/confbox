import { parse } from "jsonc-parser";

// Source: https://github.com/microsoft/node-jsonc-parser

/**
 *
 * Converts a [JSONC](https://github.com/microsoft/node-jsonc-parser) string into an object.
 *
 * @NOTE On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
 * Therefore, always check the errors list to find out if the input was valid.
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
  return parse(text, options?.errors, options) as T;
}

// --- Types ---

export interface JSONCParseOptions {
  disallowComments?: boolean;
  allowTrailingComma?: boolean;
  allowEmptyContent?: boolean;
  errors?: JSONCParseError[];
}

export interface JSONCParseError {
  error: number;
  offset: number;
  length: number;
}
