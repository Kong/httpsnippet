'use strict'

var util = require('util')

module.exports = {
  /**
   * Create an string of given length filled with blank spaces
   *
   * @param {number} length Length of the array to return
   * @return {string}
   */
  blankString: function (length) {
    return Array.apply(null, new Array(length)).map(String.prototype.valueOf, ' ').join('')
  },

  /**
   * Create a string corresponding to a valid declaration and initialization of an Objective-C object litteral.
   *
   * @param {string} nsClass Class of the litteral
   * @param {string} name Desired name of the instance
   * @param {Object} parameters Key-value object of parameters to translate to an Objective-C object litearal
   * @param {boolean} indent If true, will declare the litteral by indenting each new key/value pair.
   * @return {string} A valid Objective-C declaration and initialization of an Objective-C object litteral.
   *
   * @example
   *   nsDeclaration('NSDictionary', 'params', {a: 'b', c: 'd'}, true)
   *   // returns:
   *   NSDictionary *params = @{ @"a": @"b",
   *                             @"c": @"d" };
   *
   *   nsDeclaration('NSDictionary', 'params', {a: 'b', c: 'd'})
   *   // returns:
   *   NSDictionary *params = @{ @"a": @"b", @"c": @"d" };
   */
  nsDeclaration: function (nsClass, name, parameters, indent) {
    var opening = nsClass + ' *' + name + ' = '
    var literal = this.literalRepresentation(parameters, indent ? opening.length : undefined)
    return opening + literal + ';'
  },

  /**
   * Create a valid Objective-C string of a literal value according to its type.
   *
   * @param {*} value Any JavaScript literal
   * @return {string}
   */
  literalRepresentation: function (value, indentation) {
    var join = indentation === undefined ? ', ' : ',\n   ' + this.blankString(indentation)

    switch (Object.prototype.toString.call(value)) {
      case '[object Number]':
        return '@' + value
      case '[object Array]':
        var values_representation = value.map(function (v) {
          return this.literalRepresentation(v)
        }.bind(this))
        return '@[ ' + values_representation.join(join) + ' ]'
      case '[object Object]':
        var keyValuePairs = []
        for (var k in value) {
          keyValuePairs.push(util.format('@"%s": %s', k, this.literalRepresentation(value[k])))
        }
        return '@{ ' + keyValuePairs.join(join) + ' }'
      default:
        return '@"' + value.replace(/"/g, '\\"') + '"'
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

    code.push(this.nsDeclaration('NSArray', 'parameters', source.postData.params, opts.pretty))
    code.push(util.format('NSString *boundary = @"%s";', source.postData.boundary))
    code.push(null)
    code.push('NSError *error;')
    code.push('NSMutableString *body = [NSMutableString string];')
    code.push('for (NSDictionary *param in parameters) {')
    code.push(indent + '[body appendFormat:@"--%@\\r\\n", boundary];')
    code.push(indent + 'if (param[@"fileName"]) {')
    code.push(indent + indent + '[body appendFormat:@"Content-Disposition:form-data; name=\\"%@\\"; filename=\\"%@\\"\\r\\n", param[@"name"], param[@"fileName"]];')
    code.push(indent + indent + '[body appendFormat:@"Content-Type: %@\\r\\n\\r\\n", param[@"contentType"]];')
    code.push(indent + indent + '[body appendFormat:@"%@", [NSString stringWithContentsOfFile:param[@"fileName"] encoding:NSUTF8StringEncoding error:&error]];')
    code.push(indent + indent + 'if (error) {')
    code.push(indent + indent + indent + 'NSLog(@"%@", error);')
    code.push(indent + indent + '}')
    code.push(indent + '} else {')
    code.push(indent + indent + '[body appendFormat:@"Content-Disposition:form-data; name=\\"%@\\"\\r\\n\\r\\n", param[@"name"]];')
    code.push(indent + indent + '[body appendFormat:@"%@", param[@"value"]];')
    code.push(indent + '}')
    code.push('}')
    code.push('[body appendFormat:@"\\r\\n--%@--\\r\\n", boundary];')
    code.push('NSData *postData = [body dataUsingEncoding:NSUTF8StringEncoding];')

    return code.join('\n')
  }
}
