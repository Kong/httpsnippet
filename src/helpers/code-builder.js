'use strict'

/**
 * Helper object to format and aggragate lines of code.
 * Lines are aggregated in a `code` array, and need to be joined to obtain a proper code snippet.
 *
 * @class
 *
 * @param {string} indentation Desired indentation character for aggregated lines of code
 * @param {string} join Desired character to join each line of code
 */
var CodeBuilder = function (indentation, join) {
  this.code = []
  this.indentation = indentation
  this.lineJoin = join ? join : '\n'
}

/**
 * Add given indentation level to given string
 * @param {number} [indentationLevel=0] Desired level of indentation for this line
 * @param {string} line Line of code
 * @return {string}
 */
CodeBuilder.prototype.buildLine = function (indentationLevel, line) {
  var lineIndentation = ''
  if (Object.prototype.toString.call(indentationLevel) === '[object String]') {
    line = indentationLevel
    indentationLevel = 0
  } else if (indentationLevel === null) {
    return null
  }

  while (indentationLevel) {
    lineIndentation += this.indentation
    indentationLevel--
  }

  return lineIndentation + line
}

/**
 * Add a line at the top of current lines with given indentation level
 * @param {number} [indentationLevel=0] Desired level of indentation for this line
 * @param {string} line Line of code
 * @return {this}
 */
CodeBuilder.prototype.unshift = function (indentationLevel, str) {
  this.code.unshift(this.buildLine(indentationLevel, str))

  return this
}

/**
 * Add a line at the end of current lines with given indentation level
 * @param {number} [indentationLevel=0] Desired level of indentation for this line
 * @param {string} line Line of code
 * @return {this}
 */
CodeBuilder.prototype.push = function (indentationLevel, str) {
  this.code.push(this.buildLine(indentationLevel, str))

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

module.exports = CodeBuilder
