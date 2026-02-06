import { defineBuildConfig } from "obuild/config";

export default defineBuildConfig({
  entries: [
    {
      type: "bundle",
      input: [
        "src/index.ts",
        "src/ini.ts",
        "src/json5.ts",
        "src/jsonc.ts",
        "src/toml.ts",
        "src/yaml.ts",
      ]
    }
  ],
  hooks: {
    rolldownOutput(cfg) {
      cfg.minify = true
    }
  }
});
