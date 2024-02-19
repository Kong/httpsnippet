"use strict";
exports.__esModule = true;
exports.isMimeTypeJSON = exports.hasHeader = exports.getHeader = exports.getHeaderName = void 0;
/**
 * Given a headers object retrieve a specific header out of it via a case-insensitive key.
 */
var getHeaderName = function (headers, name) {
    return Object.keys(headers).find(function (header) { return header.toLowerCase() === name.toLowerCase(); });
};
exports.getHeaderName = getHeaderName;
/**
 * Given a headers object retrieve the contents of a header out of it via a case-insensitive key.
 */
var getHeader = function (headers, name) {
    var headerName = (0, exports.getHeaderName)(headers, name);
    if (!headerName) {
        return undefined;
    }
    return headers[headerName];
};
exports.getHeader = getHeader;
/**
 * Determine if a given case-insensitive header exists within a header object.
 */
var hasHeader = function (headers, name) {
    return Boolean((0, exports.getHeaderName)(headers, name));
};
exports.hasHeader = hasHeader;
var mimeTypeJson = [
    'application/json',
    'application/x-json',
    'text/json',
    'text/x-json',
    '+json',
];
/**
 * Determines if a given mimetype is JSON, or a variant of such.
 */
var isMimeTypeJSON = function (mimeType) {
    return mimeTypeJson.some(function (type) { return mimeType.includes(type); });
};
exports.isMimeTypeJSON = isMimeTypeJSON;
