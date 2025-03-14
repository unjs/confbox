import detectIndent from "detect-indent";

export interface FormatInfo {
  sample?: string;
  whiteSpace?: { start: string; end: string };
}

export interface FormatOptions {
  /**
   * A String or Number object that's used to insert white space into the output JSON string for readability purposes.
   *
   * When provided, identation won't be auto detected anymore.
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

const formats = new WeakMap<any, FormatInfo>();

const WhitespaceStartRe = /^(\s+)/;
const WhitespaceEndRe = /(\s+)$/;

export function detectFormat(
  text: string,
  opts: FormatOptions = {},
): FormatInfo {
  // Keep ref to a sample of the original text only if need to later detect indent to reduce memory usage.
  const sample =
    opts.indent === undefined &&
    opts.preserveIndentation !== false &&
    text.slice(0, opts?.sampleSize || 1024);

  const whiteSpace =
    opts.preserveWhitespace === false
      ? undefined
      : {
          start: WhitespaceStartRe.exec(text)?.[0] || "",
          end: WhitespaceEndRe.exec(text)?.[0] || "",
        };

  return <FormatInfo>{
    sample,
    whiteSpace,
  };
}

export function storeFormat(
  text: string,
  obj: any,
  opts?: FormatOptions,
): void {
  if (!obj || typeof obj !== "object") {
    return;
  }

  formats.set(obj, detectFormat(text, opts));
}

export function getFormat(
  obj: any,
  opts?: FormatOptions,
): {
  indent: string | number | undefined;
  whitespace: { start: string; end: string };
} {
  const format = formats.get(obj);
  if (!obj || typeof obj !== "object" || !format) {
    return { indent: opts?.indent, whitespace: { start: "", end: "" } };
  }

  const indent = opts?.indent || detectIndent(format.sample || "").indent;
  return {
    indent,
    whitespace: format.whiteSpace || { start: "", end: "" },
  };
}
