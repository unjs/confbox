import { expect, it, describe } from "vitest";
import * as confbox from "../src";
import * as fixtures from "./fixtures.mjs";

const expectedObj = {
  owner: {
    dob: "1979-05-27T07:32:00-08:00",
    name: "Preston-Werner",
  },
  title: "Example",
};

const expectedObjWithDate = {
  owner: {
    dob: new Date("1979-05-27T07:32:00-08:00"),
    name: "Preston-Werner",
  },
  title: "Example",
};

describe("confbox", () => {
  describe("json5", () => {
    it("parse fixture", () => {
      expect(confbox.parseJSON5(fixtures.json5)).toMatchObject(expectedObj);
    });
  });

  describe("jsonc", () => {
    it("parse fixture", () => {
      expect(confbox.parseJSONC(fixtures.jsonc)).toMatchObject(expectedObj);
    });
  });

  describe("toml", () => {
    it("parse fixture", () => {
      expect(confbox.parseTOML(fixtures.toml)).toMatchObject(
        expectedObjWithDate,
      );
    });
  });

  describe("yaml", () => {
    it("parse fixture", () => {
      expect(confbox.parseYAML(fixtures.yaml)).toMatchObject(
        expectedObjWithDate,
      );
    });

    it("stringify", () => {
      expect(
        confbox.parseYAML(confbox.stringifyYAML(expectedObjWithDate)),
      ).toMatchObject(expectedObjWithDate);
    });
  });

  describe("json", () => {
    it("parse fixture", () => {
      expect(confbox.parseJSON(fixtures.json)).toMatchObject(expectedObj);
    });

    it("stringify", () => {
      expect(confbox.stringifyJSON(confbox.parseJSON(fixtures.json))).toBe(
        fixtures.json,
      );
    });
  });
});
