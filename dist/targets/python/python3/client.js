"use strict";
/**
 * @description
 * HTTP code snippet generator for native Python3.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
exports.__esModule = true;
exports.python3 = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
exports.python3 = {
    info: {
        key: 'python3',
        title: 'http.client',
        link: 'https://docs.python.org/3/library/http.client.html',
        description: 'Python3 HTTP Client'
    },
    convert: function (_a, options) {
        var _b = _a.uriObj, path = _b.path, protocol = _b.protocol, host = _b.host, postData = _a.postData, allHeaders = _a.allHeaders, method = _a.method;
        if (options === void 0) { options = {}; }
        var _c = options.insecureSkipVerify, insecureSkipVerify = _c === void 0 ? false : _c;
        var _d = new code_builder_1.CodeBuilder(), push = _d.push, blank = _d.blank, join = _d.join;
        // Start Request
        push('import http.client');
        if (insecureSkipVerify) {
            push('import ssl');
        }
        blank();
        // Check which protocol to be used for the client connection
        if (protocol === 'https:') {
            var sslContext = insecureSkipVerify ? ', context = ssl._create_unverified_context()' : '';
            push("conn = http.client.HTTPSConnection(\"".concat(host, "\"").concat(sslContext, ")"));
            blank();
        }
        else {
            push("conn = http.client.HTTPConnection(\"".concat(host, "\")"));
            blank();
        }
        // Create payload string if it exists
        var payload = JSON.stringify(postData.text);
        if (payload) {
            push("payload = ".concat(payload));
            blank();
        }
        // Create Headers
        var headers = allHeaders;
        var headerCount = Object.keys(headers).length;
        if (headerCount === 1) {
            for (var header in headers) {
                push("headers = { '".concat(header, "': \"").concat((0, escape_1.escapeForDoubleQuotes)(headers[header]), "\" }"));
                blank();
            }
        }
        else if (headerCount > 1) {
            var count = 1;
            push('headers = {');
            for (var header in headers) {
                if (count++ !== headerCount) {
                    push("    '".concat(header, "': \"").concat((0, escape_1.escapeForDoubleQuotes)(headers[header]), "\","));
                }
                else {
                    push("    '".concat(header, "': \"").concat((0, escape_1.escapeForDoubleQuotes)(headers[header]), "\""));
                }
            }
            push('}');
            blank();
        }
        // Make Request
        if (payload && headerCount) {
            push("conn.request(\"".concat(method, "\", \"").concat(path, "\", payload, headers)"));
        }
        else if (payload && !headerCount) {
            push("conn.request(\"".concat(method, "\", \"").concat(path, "\", payload)"));
        }
        else if (!payload && headerCount) {
            push("conn.request(\"".concat(method, "\", \"").concat(path, "\", headers=headers)"));
        }
        else {
            push("conn.request(\"".concat(method, "\", \"").concat(path, "\")"));
        }
        // Get Response
        blank();
        push('res = conn.getresponse()');
        push('data = res.read()');
        blank();
        push('print(data.decode("utf-8"))');
        return join();
    }
};
