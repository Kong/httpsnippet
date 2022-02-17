'use strict'

const formatString = require('./format')

/**
 * Helper object to format and aggragate lines of code.
 * Lines are aggregated in a `code` array, and need to be joined to obtain a proper code snippet.
 *
 * @class
 *
 * @param {string} indentation Desired indentation character for aggregated lines of code
 * @param {string} join Desired character to join each line of code
 */
const CodeBuilder = function (indentation, join) {
  this.code = []
  this.indentLevel = 0
  this.indentation = indentation
  this.lineJoin = join || '\n'
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
CodeBuilder.prototype.buildLine = function (indentationLevel, line) {
  let lineIndentation = ''
  let slice = 2
  if (Object.prototype.toString.call(indentationLevel) === '[object String]') {
    slice = 1
    line = indentationLevel
    indentationLevel = this.indentLevel
  } else if (indentationLevel === null) {
    return null
  }

  while (indentationLevel) {
    lineIndentation += this.indentation
    indentationLevel--
  }

  const format = Array.prototype.slice.call(arguments, slice, arguments.length)
  format.unshift(lineIndentation + line)

  return formatString.apply(this, format)
}

/**
 * Invoke buildLine() and add the line at the top of current lines
 * @param {number} [indentationLevel=0] Desired level of indentation for this line
 * @param {string} line Line of code
 * @return {this}
 */
CodeBuilder.prototype.unshift = function () {
  this.code.unshift(this.buildLine.apply(this, arguments))

  return this
}

/**
 * Invoke buildLine() and add the line at the bottom of current lines
 * @param {number} [indentationLevel=0] Desired level of indentation for this line
 * @param {string} line Line of code
 * @return {this}
 */
CodeBuilder.prototype.push = function () {
  this.code.push(this.buildLine.apply(this, arguments))

  return this
}

/**
 * Add an empty line at the end of current lines
 * @return {this}
 */
CodeBuilder.prototype.blank = function () {
  this.code.push(null)

  return this
}

/**
 * Concatenate all current lines using the given lineJoin
 * @return {string}
 */
CodeBuilder.prototype.join = function () {
  return this.code.join(this.lineJoin)
}

/**
 * Increase indentation level
 * @returns {this}
 */
CodeBuilder.prototype.indent = function () {
  this.indentLevel++
  return this
}

/**
 * Decrease indentation level
 * @returns {this}
 */
CodeBuilder.prototype.unindent = function () {
  this.indentLevel--
  return this
}

/**
 * Reset indentation level
 * @returns {this}
 */
CodeBuilder.prototype.reindent = function () {
  this.indentLevel = 0
  return this
}

module.exports = CodeBuilder
