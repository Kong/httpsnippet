'use strict'

var util = require('util')

/**
 * Create an string of given length filled with blank spaces
 *
 * @param {number} length Length of the array to return
 * @return {string}
 */
function buildString (length, str) {
  return Array.apply(null, new Array(length)).map(String.prototype.valueOf, str).join('')
}

/**
 * Create a string corresponding to a Dictionary or Array literal representation with pretty option
 * and indentation.
 */
function concatArray (arr, pretty, indentation, indentLevel) {
  var currentIndent = buildString(indentLevel, indentation)
  var closingBraceIndent = buildString(indentLevel - 1, indentation)
  var join = pretty ? ',\n' + currentIndent : ', '

  if (pretty) {
    return '[\n' + currentIndent + arr.join(join) + '\n' + closingBraceIndent + ']'
  } else {
    return '[' + arr.join(join) + ']'
  }
}

module.exports = {
  /**
   * Create a string corresponding to a valid declaration and initialization of a Swift array or dictionary literal
   *
   * @param {string} name Desired name of the instance
   * @param {Object} parameters Key-value object of parameters to translate to a Swift object litearal
   * @param {Object} opts Target options
   * @return {string}
   */
  literalDeclaration: function (name, parameters, opts) {
    return util.format('let %s = %s', name, this.literalRepresentation(parameters, opts))
  },

  /**
   * Create a valid Swift string of a literal value according to its type.
   *
   * @param {*} value Any JavaScript literal
   * @param {Object} opts Target options
   * @return {string}
   */
  literalRepresentation: function (value, opts, indentLevel) {
    indentLevel = indentLevel === undefined ? 1 : indentLevel + 1

    switch (Object.prototype.toString.call(value)) {
      case '[object Number]':
        return value
      case '[object Array]':
        // Don't prettify arrays nto not take too much space
        var pretty = false
        var valuesRepresentation = value.map(function (v) {
          // Switch to prettify if the value is a dictionary with multiple keys
          if (Object.prototype.toString.call(v) === '[object Object]') {
            pretty = Object.keys(v).length > 1
          }
          return this.literalRepresentation(v, opts, indentLevel)
        }.bind(this))
        return concatArray(valuesRepresentation, pretty, opts.indent, indentLevel)
      case '[object Object]':
        var keyValuePairs = []
        for (var k in value) {
          keyValuePairs.push(util.format('"%s": %s', k, this.literalRepresentation(value[k], opts, indentLevel)))
        }
        return concatArray(keyValuePairs, opts.pretty && keyValuePairs.length > 1, opts.indent, indentLevel)
      default:
        return '"' + value.replace(/"/g, '\\"') + '"'
    }
  },

  /**
   * By appending multipart parameters one by one in the resulting snippet,
   * we make it easier for the user to edit it according to his or her needs after pasting.
   * The user can just edit the parameters NSDictionary or put this part of a snippet in a multipart builder method.
  */
  multipartBody: function (source, opts) {
    var code = []
    var indent = opts.indent

    code.push(this.literalDeclaration('parameters', source.postData.params, opts))
    code.push(null)
    code.push(util.format('let boundary = "%s"', source.postData.boundary))
    code.push(null)
    code.push('var body = ""')
    code.push('var error: NSError? = nil')
    code.push('for param in parameters {')
    code.push(indent + 'let paramName = param["name"]!')
    code.push(indent + 'body += "--\\(boundary)\\r\\n"')
    code.push(indent + 'body += "Content-Disposition:form-data; name=\\"\\(paramName)\\""')
    code.push(indent + 'if let filename = param["fileName"] {')
    code.push(indent + indent + 'let contentType = param["content-type"]!')
    code.push(indent + indent + 'let fileContent = String(contentsOfFile: filename, encoding: NSUTF8StringEncoding, error: &error)')
    code.push(indent + indent + 'if (error != nil) {')
    code.push(indent + indent + indent + 'println(error)')
    code.push(indent + indent + '}')
    code.push(indent + indent + 'body += "; filename=\\"\\(filename)\\"\\r\\n"')
    code.push(indent + indent + 'body += "Content-Type: \\(contentType)\\r\\n\\r\\n"')
    code.push(indent + indent + 'body += fileContent!')
    code.push(indent + '} else if let paramValue = param["value"] {')
    code.push(indent + indent + 'body += "\\r\\n\\r\\n\\(paramValue)"')
    code.push(indent + '}')
    code.push('}')

    return code.join('\n')
  }
}
