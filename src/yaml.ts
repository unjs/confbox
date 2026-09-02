import { load, dump } from "js-yaml";
import { type FormatOptions, getFormat, storeFormat } from "./_format";

// Source: https://github.com/nodeca/js-yaml
// Types:  https://github.com/nodeca/js-yaml/blob/master/dist/js-yaml.d.ts

/**
 * Converts a [YAML](https://yaml.org/) string into an object.
 *
 * @NOTE This function does **not** understand multi-document or empty sources, it throws exception on those.
 *
 * @NOTE Comments are not preserved after parsing.
 *
 * @NOTE Parsing uses the YAML 1.2 core schema. Tags outside of it (`!!timestamp`, `!!merge`,
 * `!!binary`, `!!omap`, `!!pairs` and `!!set`) are not resolved, so timestamps are returned as
 * strings and `<<` merge keys are kept as-is. Opt back in by installing `js-yaml` alongside
 * confbox and passing a schema:
 * `parseYAML(text, { schema: CORE_SCHEMA.withTags(mergeTag, timestampTag) })`.
 *
 * @template T The type of the return value.
 * @param text The YAML string to parse.
 * @param options Parsing options.
 * @returns The JavaScript value converted from the YAML string.
 */
export function parseYAML<T = unknown>(text: string, options?: YAMLParseOptions): T {
  const obj = load(text, options);
  storeFormat(text, obj, options);
  return obj as T;
}

/**
 * Converts a JavaScript value to a [YAML](https://yaml.org/) string.
 *
 * @NOTE Comments are not preserved in the output.
 *
 * @param value
 * @param options
 * @returns The YAML string converted from the JavaScript value.
 */
export function stringifyYAML(value: any, options?: YAMLStringifyOptions): string {
  const format = getFormat(value, { preserveIndentation: false });
  const indentSize = typeof format.indent === "string" ? format.indent.length : format.indent;
  const str = dump(value, {
    indent: indentSize,
    ...options,
  });
  return format.whitespace.start + str.trim() + format.whitespace.end;
}

// --- Types ---

export interface YAMLParseOptions extends FormatOptions {
  /** File path used in error messages. */
  filename?: string;
  /** Maximum nesting depth for collections. Aliases are not taken into account. (default: 100) */
  maxDepth?: number;
  /** Schema to use. (default: `CORE_SCHEMA`) */
  schema?: any;
  /** Enables compatibility with `JSON.parse` behavior. Duplicate keys in a mapping override values instead of throwing an error. (default: false) */
  json?: boolean;
  /**
   * Maximum total number of keys processed by merge (`<<`) across one load call.
   * Each member of a merge sequence also counts as one key. Set to `-1` to disable the limit. (default: 10000)
   */
  maxTotalMergeKeys?: number;
  /** Maximum number of alias nodes (`*ref`) per document. Set to `0` to reject all aliases, or to `-1` for no limit. (default: -1) */
  maxAliases?: number;
}

export interface YAMLStringifyOptions extends FormatOptions {
  /** Indentation width in spaces. (default: 2) */
  indent?: number;
  /** Does not add an indentation level to array elements when enabled. (default: false) */
  seqNoIndent?: boolean;
  /** Allows a nested collection to start on the same line after `-`. (default: true) */
  seqInlineFirst?: boolean;
  /** Preferred line width for folding. Unbreakable and more-indented lines may exceed it. Set to `-1` for unlimited width. (default: 80) */
  lineWidth?: number;
  /** Adds spaces inside flow collection brackets: `{a: 1}` becomes `{ a: 1 }`. (default: false) */
  flowBracketPadding?: boolean;
  /** Omits the space after commas in flow collections: `[1, 2]` becomes `[1,2]`. (default: false) */
  flowSkipCommaSpace?: boolean;
  /**
   * Omits the space after `:` in flow mappings: `{"a": 1}` becomes `{"a":1}`.
   *
   * This forces `quoteFlowKeys`; otherwise `a:1` would be parsed as a single plain scalar instead of a mapping entry. (default: false)
   */
  flowSkipColonSpace?: boolean;
  /** Quotes flow mapping keys: `{a: 1}` becomes `{"a": 1}`. (default: false) */
  quoteFlowKeys?: boolean;
  /** Quoting style to use when a string needs quotes. (default: `single`) */
  quoteStyle?: "single" | "double";
  /** Quotes all non-key strings using `quoteStyle`. (default: false) */
  forceQuotes?: boolean;
  /**
   * Customizes how strings are rendered as plain, quoted, literal, or folded scalars.
   * Rules are applied in array order; providing this option replaces the default rules.
   */
  scalarStyleRules?: readonly ((layout: any) => void)[];
  /** Prints an explicit tag before an anchor: `&ref_0 !!set` becomes `!!set &ref_0`. (default: false) */
  tagBeforeAnchor?: boolean;
  /** Schema to use. (default: `DUMP_SCHEMA`) */
  schema?: any;
  /**
   * Skips invalid types instead of throwing. Invalid mapping pairs and sequence items are skipped;
   * `undefined` sequence items are serialized as `null`. (default: false)
   */
  skipInvalid?: boolean;
  /** Inlines duplicate objects instead of converting them into references. (default: false) */
  noRefs?: boolean;
  /** Nesting level at which collections switch from block to flow style. Set to `-1` to never switch automatically. (default: -1) */
  flowLevel?: number;
  /**
   * Sorts mapping keys when `true`. A function can be provided to define the sort order. (default: false)
   *
   * @deprecated Use `transform` to reorder mapping items.
   */
  sortKeys?: boolean | ((a: any, b: any) => number);
  /** Mutates the generated AST before it is rendered. */
  transform?: (documents: any[]) => void;
}
