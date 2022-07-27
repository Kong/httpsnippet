export interface EscapeOptions {
  /**
   * The delimiter that will be used to wrap the string (and so must be escaped
   * when used within the string).
   * Defaults to "
   */
  delimiter?: string;

  /**
   * The char to use to escape the delimiter and other special characters.
   * Defaults to \
   */
  escapeChar?: string;

  /**
   * Whether newlines (\n and \r) should be escaped within the string.
   * Defaults to true.
   */
  escapeNewlines?: boolean;
}

/**
 * Escape characters within a value to make it safe to insert directly into a
 * snippet. Takes options which define the escape requirements.
 *
 * This is closely based on the JSON-stringify string serialization algorithm,
 * but generalized for other string delimiters (e.g. " or ') and different escape
 * characters (e.g. Powershell uses `)
 *
 * See https://tc39.es/ecma262/multipage/structured-data.html#sec-quotejsonstring
 * for the complete original algorithm.
 */
export function escapeString(value: any, options: EscapeOptions = {}) {
  const {
    delimiter = '"',
    escapeChar = '\\',
    escapeNewlines = true
  } = options;

  value = value.toString();

  return [...value].map((c) => {
    if (c === '\b') {
      return escapeChar + 'b';
    } else if (c === '\t') {
      return escapeChar + 't';
    } else if (c === '\n') {
      if (escapeNewlines) {
        return escapeChar + 'n';
      } else {
        return c; // Don't just continue, or this is caught by < \u0020
      }
    } else if (c === '\f') {
      return escapeChar + 'f';
    } else if (c === '\r') {
      if (escapeNewlines) {
        return escapeChar + 'r';
      } else {
        return c; // Don't just continue, or this is caught by < \u0020
      }
    } else if (c === escapeChar) {
      return escapeChar + escapeChar;
    } else if (c === delimiter) {
      return escapeChar + delimiter;
    } else if (c < '\u0020' || c > '\u007E') {
      // Delegate the trickier non-ASCII cases to the normal algorithm. Some of these
      // are escaped as \uXXXX, whilst others are represented literally. Since we're
      // using this primarily for header values that are generally (though not 100%
      // strictly?) ASCII-only, this should almost never happen.
      return JSON.stringify(c).slice(1, -1);
    } else {
      return c;
    }
  }).join('');
}

export const escapeForSingleQuotes = (value: any) =>
  escapeString(value, { delimiter: "'" });

export const escapeForDoubleQuotes = (value: any) =>
  escapeString(value, { delimiter: '"' });
