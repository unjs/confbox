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

    it("stringify nested values added to a flat document", () => {
      const obj = confbox.parseYAML<any>("a: 1\n");
      obj.b = { c: [1, 2] };
      const str = confbox.stringifyYAML(obj);
      expect(str).toBe("a: 1\nb:\n  c:\n    - 1\n    - 2\n");
      expect(confbox.parseYAML(str)).toEqual({ a: 1, b: { c: [1, 2] } });
    });

    it("stringify nested values added to a flat sequence", () => {
      const arr = confbox.parseYAML<any[]>("- a\n- b\n");
      arr.push({ c: [1] });
      const str = confbox.stringifyYAML(arr);
      expect(str).toBe("- a\n- b\n- c:\n    - 1\n");
      expect(confbox.parseYAML(str)).toEqual(["a", "b", { c: [1] }]);
    });

    it("stringify with an explicit zero indent", () => {
      const obj = confbox.parseYAML<any>("a: 1\n");
      obj.b = { c: 1 };
      const str = confbox.stringifyYAML(obj, { indent: 0 });
      expect(confbox.parseYAML(str)).toEqual({ a: 1, b: { c: 1 } });
    });

    // A quadratic trailing-whitespace scan takes seconds here and hits the test timeout (#104).
    it("parses a long whitespace run before the document", () => {
      const input = " ".repeat(200_000) + "\nmeta:\n  a: 1\n";
      expect(confbox.parseYAML(input)).toEqual({ meta: { a: 1 } });
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

  describe("indent", () => {
    // `stringifyJSON({ a: 1 }, { indent: 0 })` has always minified, matching `JSON.stringify`.
    // On a value from `parse*` the stored format used to win because `0` is falsy, so the same
    // option silently produced indented output — the one case where it actually matters.
    const jsonDetected = '{\n    "a": 1,\n    "b": {\n        "c": 2\n    }\n}';
    const cases = {
      json: [confbox.parseJSON, confbox.stringifyJSON, '{"a":1,"b":{"c":2}}', jsonDetected],
      jsonc: [confbox.parseJSONC, confbox.stringifyJSONC, '{"a":1,"b":{"c":2}}', jsonDetected],
      json5: [
        confbox.parseJSON5,
        confbox.stringifyJSON5,
        "{a:1,b:{c:2}}",
        "{\n    a: 1,\n    b: {\n        c: 2,\n    },\n}",
      ],
    } as const;

    const indented = '{\n    "a": 1,\n    "b": { "c": 2 }\n}';

    for (const [format, [parse, stringify, minified, detected]] of Object.entries(cases)) {
      for (const indent of [0, ""] as const) {
        it(`${format} honors indent: ${JSON.stringify(indent)} on a parsed value`, () => {
          expect(stringify(parse(indented), { indent })).toBe(minified);
        });
      }

      it(`${format} still auto-detects indentation when no indent is given`, () => {
        expect(stringify(parse(indented))).toBe(detected);
      });
    }

    // Parse-time `indent` / `preserveIndentation: false` used to be dropped, so the value came
    // back minified instead of with the requested (or default) indentation.
    const parseTimeCases = {
      json: [confbox.parseJSON, confbox.stringifyJSON, '{\n    "a": 1\n}', '{\n  "a": 1\n}'],
      jsonc: [confbox.parseJSONC, confbox.stringifyJSONC, '{\n    "a": 1\n}', '{\n  "a": 1\n}'],
      json5: [confbox.parseJSON5, confbox.stringifyJSON5, "{\n    a: 1,\n}", "{\n  a: 1,\n}"],
      yaml: [confbox.parseYAML, confbox.stringifyYAML, "a:\n    b: 1\n", "a:\n  b: 1\n"],
    } as const;

    for (const [format, [parse, stringify, indent4, indent2]] of Object.entries(parseTimeCases)) {
      const text = format === "yaml" ? "a:\n  b: 1\n" : '{\n  "a": 1\n}';

      it(`${format} keeps a parse-time indent when stringifying`, () => {
        expect(stringify(parse(text, { indent: 4 }))).toBe(indent4);
      });

      it(`${format} lets a stringify-time indent override the parse-time one`, () => {
        expect(stringify(parse(text, { indent: 4 }), { indent: 2 })).toBe(indent2);
      });

      it(`${format} uses the default indent with preserveIndentation: false`, () => {
        expect(stringify(parse(indent4, { preserveIndentation: false }))).toBe(indent2);
      });
    }

    it("json keeps a parse-time indent of 0", () => {
      expect(confbox.stringifyJSON(confbox.parseJSON('{\n  "a": 1\n}', { indent: 0 }))).toBe(
        '{"a":1}',
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
