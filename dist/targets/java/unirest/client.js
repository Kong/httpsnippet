"use strict";
/**
 * @description
 * HTTP code snippet generator for Java using Unirest.
 *
 * @author
 * @shashiranjan84
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
exports.unirest = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
exports.unirest = {
    info: {
        key: 'unirest',
        title: 'Unirest',
        link: 'http://unirest.io/java.html',
        description: 'Lightweight HTTP Request Client Library'
    },
    convert: function (_a, options) {
        var method = _a.method, allHeaders = _a.allHeaders, postData = _a.postData, fullUrl = _a.fullUrl;
        var opts = __assign({ indent: '  ' }, options);
        var _b = new code_builder_1.CodeBuilder({ indent: opts.indent }), join = _b.join, push = _b.push;
        var methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
        if (!methods.includes(method.toUpperCase())) {
            push("HttpResponse<String> response = Unirest.customMethod(\"".concat(method.toUpperCase(), "\",\"").concat(fullUrl, "\")"));
        }
        else {
            push("HttpResponse<String> response = Unirest.".concat(method.toLowerCase(), "(\"").concat(fullUrl, "\")"));
        }
        // Add headers, including the cookies
        Object.keys(allHeaders).forEach(function (key) {
            push(".header(\"".concat(key, "\", \"").concat((0, escape_1.escapeForDoubleQuotes)(allHeaders[key]), "\")"), 1);
        });
        if (postData.text) {
            push(".body(".concat(JSON.stringify(postData.text), ")"), 1);
        }
        push('.asString();', 1);
        return join();
    }
};
