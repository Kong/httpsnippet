"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.escapeForDoubleQuotes = exports.escapeForSingleQuotes = exports.escapeString = void 0;
/**
 * Escape characters within a value to make it safe to insert directly into a
 * snippet. Takes options which define the escape requirements.
 *
 * This is closely based on the JSON-stringify string serialization algorithm,
 * but generalized for other string delimiters (e.g. " or ') and different escape
 * characters (e.g. Powershell uses `)
 *
 * See https://tc39.es/ecma262/multipage/structured-data.html#sec-quotejsonstring
 * for the complete original algorithm.
 */
function escapeString(rawValue, options) {
    if (options === void 0) { options = {}; }
    var _a = options.delimiter, delimiter = _a === void 0 ? '"' : _a, _b = options.escapeChar, escapeChar = _b === void 0 ? '\\' : _b, _c = options.escapeNewlines, escapeNewlines = _c === void 0 ? true : _c;
    var stringValue = rawValue.toString();
    return __spreadArray([], __read(stringValue), false).map(function (c) {
        if (c === '\b') {
            return escapeChar + 'b';
        }
        else if (c === '\t') {
            return escapeChar + 't';
        }
        else if (c === '\n') {
            if (escapeNewlines) {
                return escapeChar + 'n';
            }
            else {
                return c; // Don't just continue, or this is caught by < \u0020
            }
        }
        else if (c === '\f') {
            return escapeChar + 'f';
        }
        else if (c === '\r') {
            if (escapeNewlines) {
                return escapeChar + 'r';
            }
            else {
                return c; // Don't just continue, or this is caught by < \u0020
            }
        }
        else if (c === escapeChar) {
            return escapeChar + escapeChar;
        }
        else if (c === delimiter) {
            return escapeChar + delimiter;
        }
        else if (c < '\u0020' || c > '\u007E') {
            // Delegate the trickier non-ASCII cases to the normal algorithm. Some of these
            // are escaped as \uXXXX, whilst others are represented literally. Since we're
            // using this primarily for header values that are generally (though not 100%
            // strictly?) ASCII-only, this should almost never happen.
            return JSON.stringify(c).slice(1, -1);
        }
        else {
            return c;
        }
    }).join('');
}
exports.escapeString = escapeString;
/**
 * Make a string value safe to insert literally into a snippet within single quotes,
 * by escaping problematic characters, including single quotes inside the string,
 * backslashes, newlines, and other special characters.
 *
 * If value is not a string, it will be stringified with .toString() first.
 */
var escapeForSingleQuotes = function (value) {
    return escapeString(value, { delimiter: "'" });
};
exports.escapeForSingleQuotes = escapeForSingleQuotes;
/**
 * Make a string value safe to insert literally into a snippet within double quotes,
 * by escaping problematic characters, including double quotes inside the string,
 * backslashes, newlines, and other special characters.
 *
 * If value is not a string, it will be stringified with .toString() first.
 */
var escapeForDoubleQuotes = function (value) {
    return escapeString(value, { delimiter: '"' });
};
exports.escapeForDoubleQuotes = escapeForDoubleQuotes;
