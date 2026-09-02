# AGENTS.md

Compact YAML / TOML / JSONC / JSON5 / INI / JSON parser + serializer. Zero runtime deps, tree-shakable, preserves code style.

## Layout

- `src/<format>.ts` — one file per format, each exports `parse<FMT>` / `stringify<FMT>` + its option types. Thin wrapper over an upstream lib.
- `src/_format.ts` — style preservation. `storeFormat()` attaches a non-enumerable `Symbol.for("__confbox_fmt__")` (indent sample + leading/trailing whitespace) on parse; `getFormat()` reads it back on stringify.
- `src/index.ts` — re-exports only. `test/index.test.ts` + `test/fixtures.mjs`, `test/bench.mjs`.

Upstream libs: yaml→`js-yaml`, toml→`smol-toml`, jsonc→`jsonc-parser`, json5→`json5` (deep imports `json5/lib/*`), ini→`ini`, json→native.

## Rules

- **Everything is a devDependency.** `obuild` bundles upstream libs into `dist/`, so `dependencies` must stay empty. Never add one.
- Option interfaces are **hand-copied** from upstream typings (see `// Source:` comments) — don't `import type` from the libs, and refresh them when bumping a lib.
- Adding a format = new `src/x.ts` + `build.config.ts` entry + `package.json` `exports` + `src/index.ts` re-export + test.
- Round-trip is the contract: `stringify(parse(text)) === text` (minus comments). Test that, not just parse.
- JSDoc on exported functions is the README — `automd` regenerates the API section from `src/index`. Edit the JSDoc, not the README block.

## Commands

`pnpm dev` (watch) · `pnpm test` (lint + types + vitest) · `pnpm lint:fix` (oxlint + oxfmt) · `pnpm build` · `pnpm bench`

CI runs lint, `test:types`, build, vitest+coverage. autofix.ci auto-commits `lint:fix` and `automd` output, so don't fight formatting.
