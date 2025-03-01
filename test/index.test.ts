import { expect, it, describe } from "vitest";
import * as confbox from "../src";
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
      expect(confbox.stringifyTOML(confbox.parseTOML(fixtures.toml))).toBe(
        fixtures.toml.replace(/\s*#.*/g, ""),
      );
    });
  });

  describe("yaml", () => {
    it("parse", () => {
      expect(confbox.parseYAML(fixtures.yaml)).toMatchObject(
        fixtures.objWithDate,
      );
    });

    it("stringify", () => {
      expect(confbox.stringifyYAML(confbox.parseYAML(fixtures.yaml))).toBe(
        fixtures.yaml.replace(/\s*#.*/g, ""),
      );
    });
  });

  describe("json", () => {
    it("parse", () => {
      expect(confbox.parseJSON(fixtures.json)).toMatchObject(fixtures.obj);
    });

    it("stringify", () => {
      expect(confbox.stringifyJSON(confbox.parseJSON(fixtures.json))).toBe(
        fixtures.json,
      );
    });
  });

  describe("ini", () => {
    it.skip("parse", () => {
      expect(confbox.parseINI(fixtures.ini)).toMatchObject(fixtures.obj);
    });

    it("stringify", () => {
      expect(confbox.stringifyINI(confbox.parseINI(fixtures.ini))).toBe(
        fixtures.ini,
      );
    });
  });
});
