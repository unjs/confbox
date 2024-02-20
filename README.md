# confbox

<!-- automd:badges color=yellow no-npmDownloads bundlephobia packagephobia -->

[![npm version](https://flat.badgen.net/npm/v/confbox?color=yellow)](https://npmjs.com/package/confbox)
[![bundle size](https://flat.badgen.net/bundlephobia/minzip/confbox?color=yellow)](https://bundlephobia.com/package/confbox)
[![install size](https://flat.badgen.net/packagephobia/publish/confbox?color=yellow)](https://packagephobia.com/result?p=confbox)

<!-- /automd -->

Config parsers for:

✅ [YAML](https://yaml.org/) (with [`js-yaml`](https://github.com/nodeca/js-yaml))

✅ [TOML](https://toml.io/) (with [`smol-toml`](https://github.com/squirrelchat/smol-toml))

✅ [JSONC](https://github.com/microsoft/node-jsonc-parser) (with [`jsonc-parser`](https://github.com/microsoft/node-jsonc-parser))

✅ [JSON5](https://json5.org/) (with [`json5`](https://github.com/json5/json5))

With perfect bundling:

✨ Types exported out of the box

✨ Zero config and compact redistribution

✨ Dual ESM/CJS build

✨ Consistent and tested API

✨ Handpicked best libraries (bundle+perf)

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

<!-- automd:jsimport cjs cdn src="./src/index.ts" -->

**ESM** (Node.js, Bun)

```js
import {
  parseJSON5,
  parseJSONC,
  parseYAML,
  stringifyYAML,
  parseTOML,
} from "confbox";
```

**CommonJS** (Legacy Node.js)

```js
const {
  parseJSON5,
  parseJSONC,
  parseYAML,
  stringifyYAML,
  parseTOML,
} = require("confbox");
```

**CDN** (Deno, Bun and Browsers)

```js
import {
  parseJSON5,
  parseJSONC,
  parseYAML,
  stringifyYAML,
  parseTOML,
} from "https://esm.sh/confbox";
```

<!-- /automd -->

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

<!-- automd:fetch url="gh:unjs/.github/main/snippets/readme-contrib-node-pnpm.md" -->

## Contribution

<details>
  <summary>Local development</summary>

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run tests using `pnpm dev` or `pnpm test`

</details>

<!-- /automd -->

## License

<!-- automd:contributors license=MIT author=pi0 -->

Published under the [MIT](https://github.com/unjs/confbox/blob/main/LICENSE) license.
Made by [@pi0](https://github.com/pi0) and [community](https://github.com/unjs/confbox/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/confbox/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/confbox" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io) (last updated: Tue Feb 20 2024)_

<!-- /automd -->
