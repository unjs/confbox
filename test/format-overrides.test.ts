import { describe, expect, it } from "vitest";
import {
  parseJSON,
  stringifyJSON,
  parseJSONC,
  stringifyJSONC,
  parseJSON5,
  stringifyJSON5,
  parseYAML,
  stringifyYAML,
} from "../src";

describe("stringify format overrides", () => {
  for (const [name, parse, stringify] of [
    ["JSON", parseJSON, stringifyJSON],
    ["JSONC", parseJSONC, stringifyJSONC],
    ["JSON5", parseJSON5, stringifyJSON5],
    ["YAML", parseYAML, stringifyYAML],
  ] as const) {
    const source = '\n{\n    "name": "sample"\n}\n\n';
    it(`${name} can disable stored whitespace`, () => {
      const value = parse(source);
      expect(stringify(value, { preserveWhitespace: false })).toBe(stringify(value).trim());
    });
    it(`${name} can disable stored indentation`, () => {
      const value = parse(source);
      expect(stringify(value, { preserveIndentation: false })).toBe(
        "\n" + stringify({ name: "sample" }) + "\n\n",
      );
    });
    it(`${name} preserves the default unless overridden`, () => {
      const value = parse(source);
      expect(stringify(value, {})).toBe(stringify(value));
      expect(stringify(value, { preserveIndentation: false, indent: 4 })).toBe(stringify(value));
    });
  }
});
