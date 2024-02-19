"use strict";
/**
 * @description
 * Asynchronous Http and WebSocket Client library for Java
 *
 * @author
 * @windard
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
exports.asynchttp = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
exports.asynchttp = {
    info: {
        key: 'asynchttp',
        title: 'AsyncHttp',
        link: 'https://github.com/AsyncHttpClient/async-http-client',
        description: 'Asynchronous Http and WebSocket Client library for Java'
    },
    convert: function (_a, options) {
        var method = _a.method, allHeaders = _a.allHeaders, postData = _a.postData, fullUrl = _a.fullUrl;
        var opts = __assign({ indent: '  ' }, options);
        var _b = new code_builder_1.CodeBuilder({ indent: opts.indent }), blank = _b.blank, push = _b.push, join = _b.join;
        push('AsyncHttpClient client = new DefaultAsyncHttpClient();');
        push("client.prepare(\"".concat(method.toUpperCase(), "\", \"").concat(fullUrl, "\")"));
        // Add headers, including the cookies
        Object.keys(allHeaders).forEach(function (key) {
            push(".setHeader(\"".concat(key, "\", \"").concat((0, escape_1.escapeForDoubleQuotes)(allHeaders[key]), "\")"), 1);
        });
        if (postData.text) {
            push(".setBody(".concat(JSON.stringify(postData.text), ")"), 1);
        }
        push('.execute()', 1);
        push('.toCompletableFuture()', 1);
        push('.thenAccept(System.out::println)', 1);
        push('.join();', 1);
        blank();
        push('client.close();');
        return join();
    }
};
