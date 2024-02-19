"use strict";
exports.__esModule = true;
exports.restsharp = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
var headers_1 = require("../../../helpers/headers");
exports.restsharp = {
    info: {
        key: 'restsharp',
        title: 'RestSharp',
        link: 'http://restsharp.org/',
        description: 'Simple REST and HTTP API Client for .NET'
    },
    convert: function (_a) {
        var allHeaders = _a.allHeaders, method = _a.method, fullUrl = _a.fullUrl, headersObj = _a.headersObj, cookies = _a.cookies, postData = _a.postData;
        var _b = new code_builder_1.CodeBuilder(), push = _b.push, join = _b.join;
        var isSupportedMethod = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(method.toUpperCase());
        if (!isSupportedMethod) {
            return 'Method not supported';
        }
        push("var client = new RestClient(\"".concat(fullUrl, "\");"));
        push("var request = new RestRequest(Method.".concat(method.toUpperCase(), ");"));
        // Add headers, including the cookies
        Object.keys(headersObj).forEach(function (key) {
            push("request.AddHeader(\"".concat(key, "\", \"").concat((0, escape_1.escapeForDoubleQuotes)(headersObj[key]), "\");"));
        });
        cookies.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            push("request.AddCookie(\"".concat(name, "\", \"").concat(value, "\");"));
        });
        if (postData.text) {
            var header = (0, headers_1.getHeader)(allHeaders, 'content-type');
            var text = JSON.stringify(postData.text);
            push("request.AddParameter(\"".concat(header, "\", ").concat(text, ", ParameterType.RequestBody);"));
        }
        push('IRestResponse response = client.Execute(request);');
        return join();
    }
};
