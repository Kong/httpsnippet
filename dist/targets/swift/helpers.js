"use strict";
exports.__esModule = true;
exports.literalRepresentation = exports.literalDeclaration = void 0;
/**
 * Create an string of given length filled with blank spaces
 *
 * @param length Length of the array to return
 * @param str String to pad out with
 */
var buildString = function (length, str) { return str.repeat(length); };
/**
 * Create a string corresponding to a Dictionary or Array literal representation with pretty option and indentation.
 */
var concatArray = function (arr, pretty, indentation, indentLevel) {
    var currentIndent = buildString(indentLevel, indentation);
    var closingBraceIndent = buildString(indentLevel - 1, indentation);
    var join = pretty ? ",\n".concat(currentIndent) : ', ';
    if (pretty) {
        return "[\n".concat(currentIndent).concat(arr.join(join), "\n").concat(closingBraceIndent, "]");
    }
    return "[".concat(arr.join(join), "]");
};
/**
 * Create a string corresponding to a valid declaration and initialization of a Swift array or dictionary literal
 *
 * @param name Desired name of the instance
 * @param parameters Key-value object of parameters to translate to a Swift object litearal
 * @param opts Target options
 * @return {string}
 */
var literalDeclaration = function (name, parameters, opts) {
    return "let ".concat(name, " = ").concat((0, exports.literalRepresentation)(parameters, opts));
};
exports.literalDeclaration = literalDeclaration;
/**
 * Create a valid Swift string of a literal value according to its type.
 *
 * @param value Any JavaScript literal
 * @param opts Target options
 */
var literalRepresentation = function (value, opts, indentLevel) {
    indentLevel = indentLevel === undefined ? 1 : indentLevel + 1;
    switch (Object.prototype.toString.call(value)) {
        case '[object Number]':
            return value;
        case '[object Array]': {
            // Don't prettify arrays nto not take too much space
            var pretty_1 = false;
            var valuesRepresentation = value.map(function (v) {
                // Switch to prettify if the value is a dictionary with multiple keys
                if (Object.prototype.toString.call(v) === '[object Object]') {
                    pretty_1 = Object.keys(v).length > 1;
                }
                return (0, exports.literalRepresentation)(v, opts, indentLevel);
            });
            // @ts-expect-error needs better types
            return concatArray(valuesRepresentation, pretty_1, opts.indent, indentLevel);
        }
        case '[object Object]': {
            var keyValuePairs = [];
            for (var key in value) {
                keyValuePairs.push("\"".concat(key, "\": ").concat((0, exports.literalRepresentation)(value[key], opts, indentLevel)));
            }
            return concatArray(keyValuePairs, 
            // @ts-expect-error needs better types
            opts.pretty && keyValuePairs.length > 1, 
            // @ts-expect-error needs better types
            opts.indent, indentLevel);
        }
        case '[object Boolean]':
            return value.toString();
        default:
            if (value === null || value === undefined) {
                return '';
            }
            return "\"".concat(value.toString().replace(/"/g, '\\"'), "\"");
    }
};
exports.literalRepresentation = literalRepresentation;
