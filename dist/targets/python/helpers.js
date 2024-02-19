"use strict";
exports.__esModule = true;
exports.literalRepresentation = void 0;
/**
 * Create a string corresponding to a Dictionary or Array literal representation with pretty option
 * and indentation.
 */
function concatValues(concatType, values, pretty, indentation, indentLevel) {
    var currentIndent = indentation.repeat(indentLevel);
    var closingBraceIndent = indentation.repeat(indentLevel - 1);
    var join = pretty ? ",\n".concat(currentIndent) : ', ';
    var openingBrace = concatType === 'object' ? '{' : '[';
    var closingBrace = concatType === 'object' ? '}' : ']';
    if (pretty) {
        return "".concat(openingBrace, "\n").concat(currentIndent).concat(values.join(join), "\n").concat(closingBraceIndent).concat(closingBrace);
    }
    if (concatType === 'object' && values.length > 0) {
        return "".concat(openingBrace, " ").concat(values.join(join), " ").concat(closingBrace);
    }
    return "".concat(openingBrace).concat(values.join(join)).concat(closingBrace);
}
/**
 * Create a valid Python string of a literal value according to its type.
 *
 * @param {*} value Any JavaScript literal
 * @param {Object} opts Target options
 * @return {string}
 */
var literalRepresentation = function (value, opts, indentLevel) {
    indentLevel = indentLevel === undefined ? 1 : indentLevel + 1;
    switch (Object.prototype.toString.call(value)) {
        case '[object Number]':
            return value;
        case '[object Array]': {
            var pretty_1 = false;
            var valuesRepresentation = value.map(function (v) {
                // Switch to prettify if the value is a dictionary with multiple keys
                if (Object.prototype.toString.call(v) === '[object Object]') {
                    pretty_1 = Object.keys(v).length > 1;
                }
                return (0, exports.literalRepresentation)(v, opts, indentLevel);
            });
            return concatValues('array', valuesRepresentation, pretty_1, opts.indent, indentLevel);
        }
        case '[object Object]': {
            var keyValuePairs = [];
            for (var key in value) {
                keyValuePairs.push("\"".concat(key, "\": ").concat((0, exports.literalRepresentation)(value[key], opts, indentLevel)));
            }
            return concatValues('object', keyValuePairs, opts.pretty && keyValuePairs.length > 1, opts.indent, indentLevel);
        }
        case '[object Null]':
            return 'None';
        case '[object Boolean]':
            return value ? 'True' : 'False';
        default:
            if (value === null || value === undefined) {
                return '';
            }
            return "\"".concat(value.toString().replace(/"/g, '\\"'), "\"");
    }
};
exports.literalRepresentation = literalRepresentation;
