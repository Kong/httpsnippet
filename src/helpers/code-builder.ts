import { format } from 'util';

const DEFAULT_LINE_JOIN = '\n';
const DEFAULT_INDENTATION = 0;

type LineBuilder<T> = (line: string, indentationLevel?: number, ...placeholders: string[]) => T;

export class CodeBuilder {
  code: string[] = [];
  indentationCharacter: string | undefined = undefined;
  lineJoin = DEFAULT_LINE_JOIN;

  /**
   * Helper object to format and aggragate lines of code.
   * Lines are aggregated in a `code` array, and need to be joined to obtain a proper code snippet.
   *
   * @param indentationToken Desired indentation character for aggregated lines of code
   * @param join Desired character to join each line of code
   */
  constructor(indentationToken?: string, join: string = DEFAULT_LINE_JOIN) {
    this.indentationCharacter = indentationToken;
    this.lineJoin = join || DEFAULT_LINE_JOIN;
  }

  /**
   * Add given indentation level to given string and format the string (variadic)
   */
  buildLine: LineBuilder<null | string> = (line, indentationLevel = DEFAULT_INDENTATION, ...placeholders) => {
    let lineIndentation = '';
    if (indentationLevel === null) {
      return null;
    }

    while (indentationLevel) {
      lineIndentation += this.indentationCharacter;
      indentationLevel--;
    }

    placeholders.unshift(`${lineIndentation}${line}`);
    return format.apply(this, placeholders);
  };

  /**
   * Add the line at the beginning of the current lines
   */
  unshift: LineBuilder<CodeBuilder> = (line, indentationLevel = DEFAULT_INDENTATION, ...placeholders) => {
    const newLine = this.buildLine(line, indentationLevel, ...placeholders);
    this.code.unshift(newLine);
    return this;
  };

  /**
   * Add the line at the end of the current lines
   */
  push: LineBuilder<CodeBuilder> = (line, indentationLevel = DEFAULT_INDENTATION, ...placeholders) => {
    const newLine = this.buildLine(line, indentationLevel, ...placeholders);
    this.code.push(newLine);
    return this;
  };

  /**
   * Add an empty line at the end of current lines
   */
  blank = () => {
    this.code.push('');
    return this;
  };

  /**
   * Concatenate all current lines using the given lineJoin
   */
  join = () => this.code.join(this.lineJoin);
}
