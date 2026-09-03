import { expect, it, describe } from "vitest";
import * as confbox from "../src";
import * as confboxYaml from "../src/yaml";
import * as fixtures from "./fixtures.mjs";

describe("confbox", () => {
  describe("json5", () => {
    it("parse", () => {
      expect(confbox.parseJSON5(fixtures.json5)).toMatchObject(fixtures.obj);
    });

    it("stringify", () => {
      expect(confbox.stringifyJSON5(confbox.parseJSON5(fixtures.json5))).toBe(
        fixtures.json5.replace(/\s*\/\/.*/g, ""),
      );
    });
  });

  describe("jsonc", () => {
    it("parse", () => {
      expect(confbox.parseJSONC(fixtures.jsonc)).toMatchObject(fixtures.obj);
    });

    it("stringify", () => {
      expect(confbox.stringifyJSONC(confbox.parseJSONC(fixtures.jsonc))).toBe(
        fixtures.jsonc.replace(/\s*\/\/.*/g, ""),
      );
    });
  });

  describe("toml", () => {
    it("parse", () => {
      expect(confbox.parseTOML(fixtures.toml)).toMatchObject({
        types: {
          ...fixtures.objWithDate.types,
          null: "null", // TOML doesn't support null
        },
      });
    });

    it("stringify", () => {
      expect(confbox.stringifyTOML(confbox.parseTOML(fixtures.toml)).trim()).toBe(
        fixtures.toml.replace(/\s*#.*/g, "").trim(),
      );
    });
  });

  describe("yaml", () => {
    it("parse", () => {
      expect(confbox.parseYAML(fixtures.yaml)).toMatchObject(fixtures.obj);
    });

    it("stringify", () => {
      expect(confbox.stringifyYAML(confbox.parseYAML(fixtures.yaml))).toBe(
        fixtures.yaml.replace(/\s*#.*/g, ""),
      );
    });

    it("throws YAMLException", () => {
      expect(() => confbox.parseYAML("a: 1\na: 2")).toThrow(confboxYaml.YAMLException);
    });
  });

  describe("json", () => {
    it("parse", () => {
      expect(confbox.parseJSON(fixtures.json)).toMatchObject(fixtures.obj);
    });

    it("stringify", () => {
      expect(confbox.stringifyJSON(confbox.parseJSON(fixtures.json))).toBe(fixtures.json);
    });

    it("stringify from raw object", () => {
      expect(confbox.stringifyJSON(JSON.parse(fixtures.json))).toBe(fixtures.json.trim());
    });
  });

  describe("bom", () => {
    const BOM = "\uFEFF";

    const roundTrip = {
      json: [confbox.parseJSON, confbox.stringifyJSON],
      jsonc: [confbox.parseJSONC, confbox.stringifyJSONC],
      json5: [confbox.parseJSON5, confbox.stringifyJSON5],
      yaml: [confbox.parseYAML, confbox.stringifyYAML],
      toml: [confbox.parseTOML, confbox.stringifyTOML],
    } as const;

    for (const [format, [parse, stringify]] of Object.entries(roundTrip)) {
      const fixture = (fixtures as Record<string, string>)[format].trim();

      it(`${format} parses with a leading BOM`, () => {
        expect(parse(BOM + fixture)).toMatchObject(parse(fixture) as object);
      });

      it(`${format} preserves the BOM when stringifying back`, () => {
        expect(stringify(parse(BOM + fixture))).toBe(BOM + stringify(parse(fixture)));
      });

      // `parseTOML` takes no options, so it always preserves whitespace.
      if (format !== "toml") {
        it(`${format} drops the BOM with preserveWhitespace: false`, () => {
          expect(stringify(parse(BOM + fixture, { preserveWhitespace: false }))).not.toContain(BOM);
        });
      }
    }

    it("ini parses with a leading BOM", () => {
      expect(confbox.parseINI(BOM + fixtures.ini)).toMatchObject(
        confbox.parseINI(fixtures.ini) as object,
      );
    });
  });

  describe("ini", () => {
    it.skip("parse", () => {
      expect(confbox.parseINI(fixtures.ini)).toMatchObject(fixtures.obj);
    });

    it("stringify", () => {
      expect(confbox.stringifyINI(confbox.parseINI(fixtures.ini))).toBe(fixtures.ini);
    });
  });
});
