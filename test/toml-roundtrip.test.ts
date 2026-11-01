import { describe, expect, it } from "vitest";
import { parseTOML, stringifyTOML } from "../src";
import { stringify as stringifyRawTOML } from "smol-toml";

describe("TOML whitespace roundtrip", () => {
  for (const source of ['name = "sample"\n', 'name = "sample"\n\n', 'name = "sample"']) {
    it(`preserves final whitespace ${JSON.stringify(source)}`, () => {
      const first = stringifyTOML(parseTOML(source));
      expect(first).toBe(source);
      expect(stringifyTOML(parseTOML(first))).toBe(first);
    });
  }
});

describe("TOML values without stored formatting", () => {
  for (const value of [{ name: "sample" }, { note: "first\nsecond" }, {}]) {
    it(`preserves the serializer output for ${JSON.stringify(value)}`, () => {
      expect(stringifyTOML(value)).toBe(stringifyRawTOML(value));
    });
  }
});
