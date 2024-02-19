"use strict";
/**
 * @description
 * HTTP code snippet generator for Python using Requests
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.requests = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
var headers_1 = require("../../../helpers/headers");
var helpers_1 = require("../helpers");
var builtInMethods = ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
exports.requests = {
    info: {
        key: 'requests',
        title: 'Requests',
        link: 'http://docs.python-requests.org/en/latest/api/#requests.request',
        description: 'Requests HTTP library'
    },
    convert: function (_a, options) {
        var queryObj = _a.queryObj, url = _a.url, postData = _a.postData, allHeaders = _a.allHeaders, method = _a.method;
        var opts = __assign({ indent: '    ', pretty: true }, options);
        // Start snippet
        var _b = new code_builder_1.CodeBuilder({ indent: opts.indent }), push = _b.push, blank = _b.blank, join = _b.join;
        // Import requests
        push('import requests');
        blank();
        // Set URL
        push("url = \"".concat(url, "\""));
        blank();
        // Construct query string
        var qs;
        if (Object.keys(queryObj).length) {
            qs = "querystring = ".concat(JSON.stringify(queryObj));
            push(qs);
            blank();
        }
        var headers = allHeaders;
        // Construct payload
        var payload = {};
        var files = {};
        var hasFiles = false;
        var hasPayload = false;
        var jsonPayload = false;
        switch (postData.mimeType) {
            case 'application/json':
                if (postData.jsonObj) {
                    push("payload = ".concat((0, helpers_1.literalRepresentation)(postData.jsonObj, opts)));
                    jsonPayload = true;
                    hasPayload = true;
                }
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                payload = {};
                postData.params.forEach(function (p) {
                    if (p.fileName) {
                        files[p.name] = "open('".concat(p.fileName, "', 'rb')");
                        hasFiles = true;
                    }
                    else {
                        payload[p.name] = p.value;
                        hasPayload = true;
                    }
                });
                if (hasFiles) {
                    push("files = ".concat((0, helpers_1.literalRepresentation)(files, opts)));
                    if (hasPayload) {
                        push("payload = ".concat((0, helpers_1.literalRepresentation)(payload, opts)));
                    }
                    // The requests library will only automatically add a `multipart/form-data` header if there are files being sent. If we're **only** sending form data we still need to send the boundary ourselves.
                    var headerName = (0, headers_1.getHeaderName)(headers, 'content-type');
                    if (headerName) {
                        delete headers[headerName];
                    }
                }
                else {
                    var nonFilePayload = JSON.stringify(postData.text);
                    if (nonFilePayload) {
                        push("payload = ".concat(nonFilePayload));
                        hasPayload = true;
                    }
                }
                break;
            default: {
                if (postData.mimeType === 'application/x-www-form-urlencoded' && postData.paramsObj) {
                    push("payload = ".concat((0, helpers_1.literalRepresentation)(postData.paramsObj, opts)));
                    hasPayload = true;
                    break;
                }
                var payload_1 = JSON.stringify(postData.text);
                if (payload_1) {
                    push("payload = ".concat(payload_1));
                    hasPayload = true;
                }
            }
        }
        // Construct headers
        var headerCount = Object.keys(headers).length;
        if (headerCount === 0 && (hasPayload || hasFiles)) {
            // If we don't have any heads but we do have a payload we should put a blank line here between that payload consturction and our execution of the requests library.
            blank();
        }
        else if (headerCount === 1) {
            for (var header in headers) {
                push("headers = {\"".concat(header, "\": \"").concat((0, escape_1.escapeForDoubleQuotes)(headers[header]), "\"}"));
                blank();
            }
        }
        else if (headerCount > 1) {
            var count = 1;
            push('headers = {');
            for (var header in headers) {
                if (count !== headerCount) {
                    push("\"".concat(header, "\": \"").concat((0, escape_1.escapeForDoubleQuotes)(headers[header]), "\","), 1);
                }
                else {
                    push("\"".concat(header, "\": \"").concat((0, escape_1.escapeForDoubleQuotes)(headers[header]), "\""), 1);
                }
                count += 1;
            }
            push('}');
            blank();
        }
        // Construct request
        var request = builtInMethods.includes(method)
            ? "response = requests.".concat(method.toLowerCase(), "(url")
            : "response = requests.request(\"".concat(method, "\", url");
        if (hasPayload) {
            if (jsonPayload) {
                request += ', json=payload';
            }
            else {
                request += ', data=payload';
            }
        }
        if (hasFiles) {
            request += ', files=files';
        }
        if (headerCount > 0) {
            request += ', headers=headers';
        }
        if (qs) {
            request += ', params=querystring';
        }
        request += ')';
        push(request);
        blank();
        // Print response
        push('print(response.json())');
        return join();
    }
};
