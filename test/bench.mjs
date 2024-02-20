import { bench, baseline, run, group } from "mitata";

import nodeToml from "toml";
import * as jsToml from "js-toml";
import * as smolToml from "smol-toml";
import jsYaml from "js-yaml";
import yaml from "yaml";
import * as json5 from "json5";
import * as jsoncParser from "jsonc-parser";

import * as confbox from "../dist/index.mjs";
import * as fixtures from "./fixtures.mjs";

function defineBench(groupName, benchs) {
  group(groupName, () => {
    const _benchs = Object.entries(benchs);
    for (const [name, fn] of _benchs) {
      // Warmup
      for (let i = 0; i < 1000; i++) {
        fn();
      }

      const runner = name === _benchs[0][0] ? baseline : bench;
      runner(name, fn);
    }
  });
}

defineBench("yaml", {
  confbox: () => {
    confbox.parseYAML(fixtures.yaml);
  },
  "eemeli/yaml": () => {
    yaml.parse(fixtures.yaml);
  },
  "nodeca/js-yaml": () => {
    jsYaml.load(fixtures.yaml);
  },
});

defineBench("toml", {
  confbox: () => {
    confbox.parseTOML(fixtures.toml);
  },
  "BinaryMuse/toml-node": () => {
    nodeToml.parse(fixtures.toml);
  },
  "sunnyadn/js-toml": () => {
    jsToml.load(fixtures.toml);
  },
  "squirrelchat/smol-toml": () => {
    smolToml.parse(fixtures.toml);
  },
});

defineBench("json5", {
  confbox: () => {
    confbox.parseJSON5(fixtures.json5);
  },
  "json5/json5": () => {
    json5.default.parse(fixtures.json5);
  },
});

defineBench("jsonc", {
  confbox: () => {
    confbox.parseJSONC(fixtures.jsonc);
  },
  "microsoft/node-jsonc-parser": () => {
    jsoncParser.parse(fixtures.jsonc);
  },
});

console.log("");

await run({
  percentiles: false,
});

console.log("");
