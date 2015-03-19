'use strict'

var CodeBuilder = function (indentation, join) {
  this.code = []
  this.indentation = indentation
  this.lineJoin = join ? join : '\n'
}

CodeBuilder.prototype.buildLine = function (indentationLevel, str) {
  var lineIndentation = ''
  if (Object.prototype.toString.call(indentationLevel) === '[object String]') {
    str = indentationLevel
    indentationLevel = 0
  } else if (indentationLevel === null) {
    return null
  }

  while (indentationLevel) {
    lineIndentation += this.indentation
    indentationLevel--
  }

  return lineIndentation + str
}

CodeBuilder.prototype.unshift = function (indentationLevel, str) {
  this.code.unshift(this.buildLine(indentationLevel, str))

  return this
}

CodeBuilder.prototype.push = function (indentationLevel, str) {
  this.code.push(this.buildLine(indentationLevel, str))

  return this
}

CodeBuilder.prototype.blank = function () {
  this.code.push(null)

  return this
}

CodeBuilder.prototype.join = function () {
  return this.code.join(this.lineJoin)
}

module.exports = CodeBuilder
