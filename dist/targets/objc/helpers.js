"use strict";
exports.__esModule = true;
exports.literalRepresentation = exports.nsDeclaration = void 0;
/**
 * Create a string corresponding to a valid declaration and initialization of an Objective-C object literal.
 *
 * @param nsClass Class of the litteral
 * @param name Desired name of the instance
 * @param parameters Key-value object of parameters to translate to an Objective-C object litearal
 * @param indent If true, will declare the litteral by indenting each new key/value pair.
 * @return A valid Objective-C declaration and initialization of an Objective-C object litteral.
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
var nsDeclaration = function (nsClass, name, parameters, indent) {
    var opening = "".concat(nsClass, " *").concat(name, " = ");
    var literal = (0, exports.literalRepresentation)(parameters, indent ? opening.length : undefined);
    return "".concat(opening).concat(literal, ";");
};
exports.nsDeclaration = nsDeclaration;
/**
 * Create a valid Objective-C string of a literal value according to its type.
 *
 * @param value Any JavaScript literal
 */
var literalRepresentation = function (value, indentation) {
    var join = indentation === undefined ? ', ' : ",\n   ".concat(' '.repeat(indentation));
    switch (Object.prototype.toString.call(value)) {
        case '[object Number]':
            return "@".concat(value);
        case '[object Array]': {
            var valuesRepresentation = value.map(function (value) { return (0, exports.literalRepresentation)(value); });
            return "@[ ".concat(valuesRepresentation.join(join), " ]");
        }
        case '[object Object]': {
            var keyValuePairs = [];
            for (var key in value) {
                keyValuePairs.push("@\"".concat(key, "\": ").concat((0, exports.literalRepresentation)(value[key])));
            }
            return "@{ ".concat(keyValuePairs.join(join), " }");
        }
        case '[object Boolean]':
            return value ? '@YES' : '@NO';
        default:
            if (value === null || value === undefined) {
                return '';
            }
            return "@\"".concat(value.toString().replace(/"/g, '\\"'), "\"");
    }
};
exports.literalRepresentation = literalRepresentation;
