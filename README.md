# confbox

<!-- automd:badges -->

[![npm version](https://flat.badgen.net/npm/v/confbox)](https://npmjs.com/package/confbox)
[![npm downloads](https://flat.badgen.net/npm/dm/confbox)](https://npmjs.com/package/confbox)

<!-- /automd -->

Config parsers for:

✅ [YAML](https://yaml.org/) (with [`js-yaml`](https://github.com/nodeca/js-yaml))

✅ [TOML](https://toml.io/) (with [`smol-toml`](https://github.com/squirrelchat/smol-toml))

✅ [JSONC](https://github.com/microsoft/node-jsonc-parser) (with [`jsonc-parser`](https://github.com/microsoft/node-jsonc-parser))

✅ [JSON5](https://json5.org/) (with [`json5`](https://github.com/json5/json5))

With perfect bundling:

✨ Types exported out of the box <br>
✨ Zero config and compact redistribution <br>
✨ Dual ESM/CJS build <br>
✨ Consistent and tested API <br>
✨ Handpicked best libraries (bundle+perf) <br>

> [!NOTE]
> Use [unjs/c12](https://github.com/unjs/c12) for a full featured configuration loader!

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
  parseTOML,
  parseYAML,
  stringifyYAML,
} from "confbox";

// Using individual builds
import { parseYAML, stringifyYAML } from "confbox/yaml";
import { parseTOML } from "confbox/toml";
import { parseJSON5 } from "confbox/json5";
import { parseJSONC } from "confbox/jsonc";

// CommonJS
const {
  parseJSON5,
  parseJSONC,
  parseTOML,
  parseYAML,
  stringifyYAML,
} = require("confbox");
```

<!-- automd:jsdocs src="./src/index" -->

### `parseJSON5(text, options?)`

Converts a [JSON5](https://json5.org/) string into an object.

### `parseJSONC(text, options?)`

Converts a [JSONC](https://github.com/microsoft/node-jsonc-parser) string into an object.

### `parseTOML(text)`

Converts a [TOML](https://toml.io/) string into an object.

### `parseYAML(text, options?)`

Converts a [YAML](https://yaml.org/) string into an object.

### `stringifyYAML(value, options?)`

Converts a JavaScript value to a [YAML](https://yaml.org/) string.

<!-- /automd -->

## Development

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).
