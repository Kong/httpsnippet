/**
 * Create an string of given length filled with blank spaces
 *
 * @param length Length of the array to return
 * @param str String to pad out with
 */
const buildString = (length: number, str: string) => str.repeat(length);

/**
 * Create a string corresponding to a Dictionary or Array literal representation with pretty option and indentation.
 */
const concatArray = <T>(arr: T[], pretty: boolean, indentation: string, indentLevel: number) => {
  const currentIndent = buildString(indentLevel, indentation);
  const closingBraceIndent = buildString(indentLevel - 1, indentation);
  const join = pretty ? `,\n${currentIndent}` : ', ';

  if (pretty) {
    return `[\n${currentIndent}${arr.join(join)}\n${closingBraceIndent}]`;
  }
  return `[${arr.join(join)}]`;
};

/**
 * Create a string corresponding to a valid declaration and initialization of a Swift array or dictionary literal
 *
 * @param name Desired name of the instance
 * @param parameters Key-value object of parameters to translate to a Swift object litearal
 * @param opts Target options
 * @return {string}
 */
export const literalDeclaration = <T, U>(name: string, parameters: T, opts: U) =>
  `let ${name} = ${literalRepresentation(parameters, opts)}`;

/**
 * Create a valid Swift string of a literal value according to its type.
 *
 * @param value Any JavaScript literal
 * @param opts Target options
 */
export const literalRepresentation = <T, U>(
  value: T,
  opts: U,
  indentLevel?: number,
): number | string => {
  indentLevel = indentLevel === undefined ? 1 : indentLevel + 1;

  switch (Object.prototype.toString.call(value)) {
    case '[object Number]':
      return value as unknown as number;

    case '[object Array]': {
      // Don't prettify arrays nto not take too much space
      let pretty = false;
      const valuesRepresentation = (value as unknown as any[]).map((v: any) => {
        // Switch to prettify if the value is a dictionary with multiple keys
        if (Object.prototype.toString.call(v) === '[object Object]') {
          pretty = Object.keys(v).length > 1;
        }
        return literalRepresentation(v, opts, indentLevel);
      });
      // @ts-expect-error needs better types
      return concatArray(valuesRepresentation, pretty, opts.indent, indentLevel);
    }

    case '[object Object]': {
      const keyValuePairs = [];
      for (const key in value) {
        keyValuePairs.push(`"${key}": ${literalRepresentation(value[key], opts, indentLevel)}`);
      }
      return concatArray(
        keyValuePairs,
        // @ts-expect-error needs better types
        opts.pretty && keyValuePairs.length > 1,
        // @ts-expect-error needs better types
        opts.indent,
        indentLevel,
      );
    }

    case '[object Boolean]':
      return (value as unknown as boolean).toString();

    default:
      if (value === null || value === undefined) {
        return '';
      }
      return `"${(value as any).toString().replace(/"/g, '\\"')}"`;
  }
};
