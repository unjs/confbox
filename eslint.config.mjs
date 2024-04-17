import unjs from 'eslint-config-unjs';

export default unjs(
  {
    ignores: [
      "test/fixture/jsonc/package.json"
    ]
  },
  { rules: {} }
);
