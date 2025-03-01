import { rm, glob } from "node:fs/promises";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true,
    },
  },
  externals: [],
  hooks: {
    async "build:done"() {
      for await (const file of glob("dist/**/*.d.ts")) {
        await rm(file);
      }
    },
  },
});
