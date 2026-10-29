import detectIndent from "detect-indent";

export interface FormatInfo {
  indent?: string | number;
  sample?: string;
  whiteSpace?: { start: string; end: string };
}

export interface FormatOptions {
  /**
   * A String or Number object that's used to insert white space into the output JSON string for readability purposes.
   *
   * When provided, identation won't be auto detected anymore.
   *
   * When passed at parse time, it is remembered and used when stringifying the value back.
   */
  indent?: string | number;

  /**
   * Set to `false` to skip indentation preservation.
   */
  preserveIndentation?: boolean;

  /**
   * Set to `false` to skip whitespace preservation.
   */
  preserveWhitespace?: boolean;

  /**
   * The number of characters to sample from the start of the text.
   *
   * Default: 1024
   */
  sampleSize?: number;
}

const ftmSymbol = Symbol.for("__confbox_fmt__");

// Note: `\s` matches `U+FEFF`, so a leading BOM is captured (and later restored) as whitespace.
const WhitespaceStartRe = /^(\s+)/;
const BlankLineRe = /^[ \t]+(?=\r?$)/gm;

/**
 * Removes a leading UTF-8 BOM (`U+FEFF`) so that upstream parsers never see it.
 *
 * The BOM is still captured as leading whitespace by {@link detectFormat}, so it is restored
 * when stringifying back (unless `preserveWhitespace` is `false`).
 */
export function stripBOM(text: string): string {
  return text.charCodeAt(0) === 0xfe_ff ? text.slice(1) : text;
}

/**
 * Takes the sample used to detect indentation, starting at the first line with content so that
 * leading padding (e.g. an SFC block padded with spaces) does not fill it.
 *
 * Whitespace-only lines are emptied: `detect-indent` skips empty lines but would count these as
 * indented ones.
 */
function indentSample(text: string, size: number): string {
  const leading = WhitespaceStartRe.exec(text)?.[0] || "";
  const start = leading.lastIndexOf("\n") + 1;
  return text.slice(start, start + size).replace(BlankLineRe, "");
}

export function detectFormat(text: string, opts: FormatOptions = {}): FormatInfo {
  // Keep ref to a sample of the original text only if need to later detect indent to reduce memory usage.
  const sample =
    opts.indent === undefined && opts.preserveIndentation !== false
      ? indentSample(stripBOM(text), opts?.sampleSize || 1024)
      : undefined;

  const whiteSpace =
    opts.preserveWhitespace === false
      ? undefined
      : {
          start: WhitespaceStartRe.exec(text)?.[0] || "",
          // `trimEnd()` strips the same set as `\s`, but in linear time: an unanchored `/(\s+)$/`
          // is quadratic on long whitespace runs that are not at the end (#104).
          end: text.slice(text.trimEnd().length),
        };

  return <FormatInfo>{
    indent: opts.indent,
    sample,
    whiteSpace,
  };
}

export function storeFormat(text: string, obj: any, opts?: FormatOptions): void {
  if (!obj || typeof obj !== "object") {
    return;
  }

  Object.defineProperty(obj, ftmSymbol, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: detectFormat(text, opts),
  });
}

export function getFormat(
  obj: any,
  opts?: FormatOptions,
): {
  indent: string | number | undefined;
  whitespace: { start: string; end: string };
} {
  if (!obj || typeof obj !== "object" || !(ftmSymbol in obj)) {
    return { indent: opts?.indent ?? 2, whitespace: { start: "", end: "" } };
  }
  const format = obj[ftmSymbol] as FormatInfo;
  // `0` and `""` are valid explicit requests for minified output, so only `undefined` falls back
  // to the parse-time indent, then to the detected one. This matches `detectFormat`, which also
  // tests for `undefined`. Without a sample (`preserveIndentation: false`), use the default.
  const indent =
    opts?.indent ?? format.indent ?? (format.sample ? detectIndent(format.sample).indent : 2);
  return {
    indent,
    whitespace: format.whiteSpace || { start: "", end: "" },
  };
}
