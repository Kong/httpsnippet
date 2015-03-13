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
   * Create a string corresponding to a valid NSDictionary declaration and initialization for Objective-C.
   *
   * @param {string} name Desired name of the NSDictionary instance
   * @param {Object} parameters Key-value object of parameters to translate to an Objective-C NSDictionary litearal
   * @param {boolean} indent If true, will declare the NSDictionary litteral by indenting each new key/value pair.
   * @return {string} A valid Objective-C declaration and initialization of an NSDictionary.
   *
   * @example
   *   nsDictionaryBuilder('params', {a: 'b', c: 'd'}, true)
   *   // returns:
   *   NSDictionary *params = @{ @"a": @"b",
   *                             @"c": @"d" };
   *
   *   nsDictionaryBuilder('params', {a: 'b', c: 'd'})
   *   // returns:
   *   NSDictionary *params = @{ @"a": @"b", @"c": @"d" };
   */
  nsDictionaryBuilder: function (name, parameters, indent) {
    var dicOpening = 'NSDictionary *' + name + ' = '
    var dicLiteral = this.literalRepresentation(parameters, indent ? dicOpening.length : null)
    return dicOpening + dicLiteral + ';'
  },

  /**
   * Similar to nsDictionaryBuilder but for NSArray literals.
   * @see nsDictionaryBuilder
   */
  nsArrayBuilder: function (name, parameters, indent) {
    var arrOpening = 'NSArray *' + name + ' = '
    var arrLiteral = this.literalRepresentation(parameters, indent ? arrOpening.length : null)
    return arrOpening + arrLiteral + ';'
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
  }
}
