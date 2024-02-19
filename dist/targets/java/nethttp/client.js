"use strict";
/**
 * @description
 * HTTP code snippet generator for Java using java.net.http.
 *
 * @author
 * @wtetsu
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
exports.nethttp = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
exports.nethttp = {
    info: {
        key: 'nethttp',
        title: 'java.net.http',
        link: 'https://openjdk.java.net/groups/net/httpclient/intro.html',
        description: 'Java Standardized HTTP Client API'
    },
    convert: function (_a, options) {
        var allHeaders = _a.allHeaders, fullUrl = _a.fullUrl, method = _a.method, postData = _a.postData;
        var opts = __assign({ indent: '  ' }, options);
        var _b = new code_builder_1.CodeBuilder({ indent: opts.indent }), push = _b.push, join = _b.join;
        push('HttpRequest request = HttpRequest.newBuilder()');
        push(".uri(URI.create(\"".concat(fullUrl, "\"))"), 2);
        Object.keys(allHeaders).forEach(function (key) {
            push(".header(\"".concat(key, "\", \"").concat((0, escape_1.escapeForDoubleQuotes)(allHeaders[key]), "\")"), 2);
        });
        if (postData.text) {
            push(".method(\"".concat(method.toUpperCase(), "\", HttpRequest.BodyPublishers.ofString(").concat(JSON.stringify(postData.text), "))"), 2);
        }
        else {
            push(".method(\"".concat(method.toUpperCase(), "\", HttpRequest.BodyPublishers.noBody())"), 2);
        }
        push('.build();', 2);
        push('HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());');
        push('System.out.println(response.body());');
        return join();
    }
};
