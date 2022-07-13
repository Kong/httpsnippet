const DEFAULT_INDENTATION_CHARACTER = '';
const DEFAULT_LINE_JOIN = '\n';

export type PostProcessor = (unreplacedCode: string) => string;

export interface CodeBuilderOptions {
  /**
   * Desired indentation character for aggregated lines of code
   * @default ''
   */
  indent?: string;

  /**
   * Desired character to join each line of code
   * @default \n
   */
  join?: string;
}

export class CodeBuilder {
  postProcessors: PostProcessor[] = [];
  code: string[] = [];
  indentationCharacter: string = DEFAULT_INDENTATION_CHARACTER;
  lineJoin = DEFAULT_LINE_JOIN;

  /**
   * Helper object to format and aggragate lines of code.
   * Lines are aggregated in a `code` array, and need to be joined to obtain a proper code snippet.
   */
  constructor({ indent, join }: CodeBuilderOptions = {}) {
    this.indentationCharacter = indent || DEFAULT_INDENTATION_CHARACTER;
    this.lineJoin = join ?? DEFAULT_LINE_JOIN;
  }

  /**
   * Add given indentation level to given line of code
   */
  indentLine = (line: string, indentationLevel = 0) => {
    const indent = this.indentationCharacter.repeat(indentationLevel);
    return `${indent}${line}`;
  };

  /**
   * Add the line at the beginning of the current lines
   */
  unshift = (line: string, indentationLevel?: number) => {
    const newLine = this.indentLine(line, indentationLevel);
    this.code.unshift(newLine);
  };

  /**
   * Add the line at the end of the current lines
   */
  push = (line: string, indentationLevel?: number) => {
    const newLine = this.indentLine(line, indentationLevel);
    this.code.push(newLine);
  };

  /**
   * Add an empty line at the end of current lines
   */
  blank = () => {
    this.code.push('');
  };

  /**
   * Concatenate all current lines using the given lineJoin, then apply any replacers that may have been added
   */
  join = () => {
    const unreplacedCode = this.code.join(this.lineJoin);
    const replacedOutput = this.postProcessors.reduce(
      (accumulator, replacer) => replacer(accumulator),
      unreplacedCode,
    );
    return replacedOutput;
  };

  /**
   * Often when writing modules you may wish to add a literal tag or bit of metadata that you wish to transform after other processing as a final step.
   * To do so, you can provide a PostProcessor function and it will be run automatically for you when you call `join()` later on.
   */
  addPostProcessor = (postProcessor: PostProcessor) => {
    this.postProcessors = [...this.postProcessors, postProcessor];
  };
}
