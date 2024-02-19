"use strict";
/**
 * @description
 * HTTP code snippet generator for R using httr
 *
 * @author
 * @gabrielakoreeda
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
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
exports.__esModule = true;
exports.httr = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
var headers_1 = require("../../../helpers/headers");
exports.httr = {
    info: {
        key: 'httr',
        title: 'httr',
        link: 'https://cran.r-project.org/web/packages/httr/vignettes/quickstart.html',
        description: 'httr: Tools for Working with URLs and HTTP'
    },
    convert: function (_a, options) {
        var _b;
        var url = _a.url, queryObj = _a.queryObj, queryString = _a.queryString, postData = _a.postData, allHeaders = _a.allHeaders, method = _a.method;
        if (options === void 0) { options = {}; }
        // Start snippet
        var _c = new code_builder_1.CodeBuilder({
            indent: (_b = options.indent) !== null && _b !== void 0 ? _b : '  '
        }), push = _c.push, blank = _c.blank, join = _c.join;
        // Import httr
        push('library(httr)');
        blank();
        // Set URL
        push("url <- \"".concat(url, "\""));
        blank();
        // Construct query string
        var qs = queryObj;
        delete queryObj.key;
        var entries = Object.entries(qs);
        var entriesCount = entries.length;
        if (entriesCount === 1) {
            var entry = entries[0];
            push("queryString <- list(".concat(entry[0], " = \"").concat(entry[1], "\")"));
            blank();
        }
        else if (entriesCount > 1) {
            push('queryString <- list(');
            entries.forEach(function (_a, i) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                var isLastItem = i !== entriesCount - 1;
                var maybeComma = isLastItem ? ',' : '';
                push("".concat(key, " = \"").concat(value, "\"").concat(maybeComma), 1);
            });
            push(')');
            blank();
        }
        // Construct payload
        var payload = JSON.stringify(postData.text);
        if (payload) {
            push("payload <- ".concat(payload));
            blank();
        }
        // Define encode
        if (postData.text || postData.jsonObj || postData.params) {
            switch (postData.mimeType) {
                case 'application/x-www-form-urlencoded':
                    push('encode <- "form"');
                    blank();
                    break;
                case 'application/json':
                    push('encode <- "json"');
                    blank();
                    break;
                case 'multipart/form-data':
                    push('encode <- "multipart"');
                    blank();
                    break;
                default:
                    push('encode <- "raw"');
                    blank();
                    break;
            }
        }
        // Construct headers
        var cookieHeader = (0, headers_1.getHeader)(allHeaders, 'cookie');
        var acceptHeader = (0, headers_1.getHeader)(allHeaders, 'accept');
        var setCookies = cookieHeader
            ? "set_cookies(`".concat(String(cookieHeader)
                .replace(/;/g, '", `')
                .replace(/` /g, '`')
                .replace(/[=]/g, '` = "'), "\")")
            : undefined;
        var setAccept = acceptHeader
            ? "accept(\"".concat((0, escape_1.escapeForDoubleQuotes)(acceptHeader), "\")")
            : undefined;
        var setContentType = "content_type(\"".concat((0, escape_1.escapeForDoubleQuotes)(postData.mimeType), "\")");
        var otherHeaders = Object.entries(allHeaders)
            // These headers are all handled separately:
            .filter(function (_a) {
            var _b = __read(_a, 1), key = _b[0];
            return !['cookie', 'accept', 'content-type'].includes(key.toLowerCase());
        })
            .map(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            return "'".concat(key, "' = '").concat((0, escape_1.escapeForSingleQuotes)(value), "'");
        })
            .join(', ');
        var setHeaders = otherHeaders
            ? "add_headers(".concat(otherHeaders, ")")
            : undefined;
        // Construct request
        var request = "response <- VERB(\"".concat(method, "\", url");
        if (payload) {
            request += ', body = payload';
        }
        if (queryString.length) {
            request += ', query = queryString';
        }
        var headerAdditions = [setHeaders, setContentType, setAccept, setCookies].filter(function (x) { return !!x; }).join(', ');
        if (headerAdditions) {
            request += ', ' + headerAdditions;
        }
        if (postData.text || postData.jsonObj || postData.params) {
            request += ', encode = encode';
        }
        request += ')';
        push(request);
        blank();
        // Print response
        push('content(response, "text")');
        return join();
    }
};
