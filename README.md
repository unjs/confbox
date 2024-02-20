# confbox

<!-- automd:badges -->

[![npm version](https://flat.badgen.net/npm/v/confbox)](https://npmjs.com/package/confbox)
[![npm downloads](https://flat.badgen.net/npm/dm/confbox)](https://npmjs.com/package/confbox)

<!-- /automd -->

Config parsers for:

👉 [YAML](https://yaml.org/)

👉 [TOML](https://toml.io/)

👉 [JSONC](https://github.com/microsoft/node-jsonc-parser)

👉 [JSON5](https://json5.org/)

With perfect bundling:

✅ Types exported out of the box

✅ Zero config and compat redistribution

✅ Dual ESM/CJS build

✅ Consistent and tested API

✅ Handpicked best options (bundle+perf)

## Usage

Install package:

<!-- automd:pm-i no-version -->

```sh
# ✨ Auto-detect
npx nypm i confbox

# npm
npm install confbox

# yarn
yarn add confbox

# pnpm
pnpm install confbox

# bun
bun install confbox
```

<!-- /automd -->

Import:

```js
// ESM (tree-shakable)
import {
  parseJSON5,
  parseJSONC,
  parseToml,
  parseYaml,
  stringifyYaml,
} from "confbox";

// Using individual builds
import { parseYaml, stringifyYaml } from "confbox/yaml";
import { parseToml } from "confbox/toml";
import { parseJSON5 } from "confbox/json5";
import { parseJSONC } from "confbox/jsonc";

// CommonJS
const {
  parseJSON5,
  parseJSONC,
  parseToml,
  parseYaml,
  stringifyYaml,
} = require("confbox");
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).
