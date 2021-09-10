/* eslint-disable no-param-reassign */
const { format } = require('util');

/**
 * Helper object to format and aggragate lines of code.
 * Lines are aggregated in a `code` array, and need to be joined to obtain a proper code snippet.
 *
 * @class
 *
 * @param {string} indentation Desired indentation character for aggregated lines of code
 * @param {string} join Desired character to join each line of code
 */
class CodeBuilder {
  constructor(indentation, join) {
    this.code = [];
    this.indentation = indentation;
    this.lineJoin = join || '\n';
  }

  /**
   * Add given indentation level to given string and format the string (variadic)
   * @param {number} [indentationLevel=0] - Desired level of indentation for this line
   * @param {string} line - Line of code. Can contain formatting placeholders
   * @param {...anyobject} - Parameter to bind to `line`'s formatting placeholders
   * @return {string}
   *
   * @example
   *   var builder = CodeBuilder('\t')
   *
   *   builder.buildLine('console.log("hello world")')
   *   // returns: 'console.log("hello world")'
   *
   *   builder.buildLine(2, 'console.log("hello world")')
   *   // returns: 'console.log("\t\thello world")'
   *
   *   builder.buildLine(2, 'console.log("%s %s")', 'hello', 'world')
   *   // returns: 'console.log("\t\thello world")'
   */
  buildLine(indentationLevel, line) {
    let lineIndentation = '';
    let slice = 2;
    if (Object.prototype.toString.call(indentationLevel) === '[object String]') {
      slice = 1;
      line = indentationLevel;
      indentationLevel = 0;
    } else if (indentationLevel === null) {
      return null;
    }

    while (indentationLevel) {
      lineIndentation += this.indentation;
      // eslint-disable-next-line no-plusplus
      indentationLevel--;
    }

    // eslint-disable-next-line prefer-rest-params
    const data = Array.prototype.slice.call(arguments, slice, arguments.length);
    data.unshift(lineIndentation + line);

    return format.apply(this, data);
  }

  /**
   * Invoke buildLine() and add the line at the top of current lines
   * @param {number} [indentationLevel=0] Desired level of indentation for this line
   * @param {string} line Line of code
   * @return {this}
   */
  unshift(...args) {
    // eslint-disable-next-line prefer-spread
    this.code.unshift(this.buildLine.apply(this, args));

    return this;
  }

  /**
   * Invoke buildLine() and add the line at the bottom of current lines
   * @param {number} [indentationLevel=0] Desired level of indentation for this line
   * @param {string} line Line of code
   * @return {this}
   */
  push(...args) {
    // eslint-disable-next-line prefer-spread
    this.code.push(this.buildLine.apply(this, args));

    return this;
  }

  /**
   * Add an empty line at the end of current lines
   * @return {this}
   */
  blank() {
    this.code.push(null);

    return this;
  }

  /**
   * Concatenate all current lines using the given lineJoin
   * @return {string}
   */
  join() {
    return this.code.join(this.lineJoin);
  }
}

module.exports = CodeBuilder;
