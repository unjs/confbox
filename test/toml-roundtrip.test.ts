import { describe, expect, it } from "vitest";
import { parseTOML, stringifyTOML } from "../src";

describe("TOML whitespace roundtrip", () => {
  for (const source of ['name = "sample"\n', 'name = "sample"\n\n', 'name = "sample"']) {
    it(`preserves final whitespace ${JSON.stringify(source)}`, () => {
      const first = stringifyTOML(parseTOML(source));
      expect(first).toBe(source);
      expect(stringifyTOML(parseTOML(first))).toBe(first);
    });
  }
});
