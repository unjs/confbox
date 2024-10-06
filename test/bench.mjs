import { bench, run, summary } from "mitata";

import nodeToml from "toml";
import * as jsToml from "js-toml";
import * as smolToml from "smol-toml";
import jsYaml from "js-yaml";
import yaml from "yaml";
import * as json5 from "json5";
import * as jsoncParser from "jsonc-parser";

import * as confbox from "../dist/index.mjs";
import * as fixtures from "./fixtures.mjs";

function defineBench(_, benchmarks) {
  // group(() => {
  summary(() => {
    for (const [name, fn] of Object.entries(benchmarks)) {
      bench(`${name}`, fn);
    }
  });
  // })
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
  "confbox.parseTOML": () => {
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
  "confbox.parseJSON5": () => {
    confbox.parseJSON5(fixtures.json5);
  },
  "json5/json5": () => {
    json5.default.parse(fixtures.json5);
  },
});

defineBench("jsonc", {
  "confbox.parseJSONC": () => {
    confbox.parseJSONC(fixtures.jsonc);
  },
  "microsoft/node-jsonc-parser": () => {
    jsoncParser.parse(fixtures.jsonc);
  },
});

defineBench("json", {
  "JSON.parse": () => {
    JSON.parse(fixtures.json);
  },
  "confbox.parseJSON": () => {
    confbox.parseJSON(fixtures.json);
  },
  "confbox.parseJSON5": () => {
    confbox.parseJSON5(fixtures.json);
  },
  "confbox.parseJSONC": () => {
    confbox.parseJSONC(fixtures.json);
  },
});

console.log("");

await run({
  percentiles: false,
});

console.log("");
