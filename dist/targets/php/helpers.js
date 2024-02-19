"use strict";
exports.__esModule = true;
exports.supportedMethods = exports.convertType = void 0;
var escape_1 = require("../../helpers/escape");
var convertType = function (obj, indent, lastIndent) {
    lastIndent = lastIndent || '';
    indent = indent || '';
    switch (Object.prototype.toString.call(obj)) {
        case '[object Null]':
            return 'null';
        case '[object Undefined]':
            return 'null';
        case '[object String]':
            return "'".concat((0, escape_1.escapeString)(obj, { delimiter: "'", escapeNewlines: false }), "'");
        case '[object Number]':
            return obj.toString();
        case '[object Array]': {
            var contents = obj
                .map(function (item) { return (0, exports.convertType)(item, "".concat(indent).concat(indent), indent); })
                .join(",\n".concat(indent));
            return "[\n".concat(indent).concat(contents, "\n").concat(lastIndent, "]");
        }
        case '[object Object]': {
            var result = [];
            for (var i in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, i)) {
                    result.push("".concat((0, exports.convertType)(i, indent), " => ").concat((0, exports.convertType)(obj[i], "".concat(indent).concat(indent), indent)));
                }
            }
            return "[\n".concat(indent).concat(result.join(",\n".concat(indent)), "\n").concat(lastIndent, "]");
        }
        default:
            return 'null';
    }
};
exports.convertType = convertType;
exports.supportedMethods = [
    'ACL',
    'BASELINE_CONTROL',
    'CHECKIN',
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LABEL',
    'LOCK',
    'MERGE',
    'MKACTIVITY',
    'MKCOL',
    'MKWORKSPACE',
    'MOVE',
    'OPTIONS',
    'POST',
    'PROPFIND',
    'PROPPATCH',
    'PUT',
    'REPORT',
    'TRACE',
    'UNCHECKOUT',
    'UNLOCK',
    'UPDATE',
    'VERSION_CONTROL',
];
