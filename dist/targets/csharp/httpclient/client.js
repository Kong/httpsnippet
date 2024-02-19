"use strict";
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
exports.httpclient = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
var headers_1 = require("../../../helpers/headers");
var getDecompressionMethods = function (allHeaders) {
    var acceptEncodings = (0, headers_1.getHeader)(allHeaders, 'accept-encoding');
    if (!acceptEncodings) {
        return []; // no decompression
    }
    var supportedMethods = {
        gzip: 'DecompressionMethods.GZip',
        deflate: 'DecompressionMethods.Deflate'
    };
    var methods = [];
    if (typeof acceptEncodings === 'string') {
        acceptEncodings = [acceptEncodings];
    }
    acceptEncodings.forEach(function (acceptEncoding) {
        acceptEncoding.split(',').forEach(function (encoding) {
            var match = /\s*([^;\s]+)/.exec(encoding);
            if (match) {
                var method = supportedMethods[match[1]];
                if (method) {
                    methods.push(method);
                }
            }
        });
    });
    return methods;
};
exports.httpclient = {
    info: {
        key: 'httpclient',
        title: 'HttpClient',
        link: 'https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient',
        description: '.NET Standard HTTP Client'
    },
    convert: function (_a, options) {
        var _b, _c;
        var allHeaders = _a.allHeaders, postData = _a.postData, method = _a.method, fullUrl = _a.fullUrl;
        var opts = __assign({ indent: '    ' }, options);
        var _d = new code_builder_1.CodeBuilder({ indent: opts.indent }), push = _d.push, join = _d.join;
        push('using System.Net.Http.Headers;');
        var clienthandler = '';
        var cookies = Boolean(allHeaders.cookie);
        var decompressionMethods = getDecompressionMethods(allHeaders);
        if (cookies || decompressionMethods.length) {
            clienthandler = 'clientHandler';
            push('var clientHandler = new HttpClientHandler');
            push('{');
            if (cookies) {
                // enable setting the cookie header
                push('UseCookies = false,', 1);
            }
            if (decompressionMethods.length) {
                // enable decompression for supported methods
                push("AutomaticDecompression = ".concat(decompressionMethods.join(' | '), ","), 1);
            }
            push('};');
        }
        push("var client = new HttpClient(".concat(clienthandler, ");"));
        push('var request = new HttpRequestMessage');
        push('{');
        var methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE'];
        method = method.toUpperCase();
        if (method && methods.includes(method)) {
            // buildin method
            method = "HttpMethod.".concat(method[0]).concat(method.substring(1).toLowerCase());
        }
        else {
            // custom method
            method = "new HttpMethod(\"".concat(method, "\")");
        }
        push("Method = ".concat(method, ","), 1);
        push("RequestUri = new Uri(\"".concat(fullUrl, "\"),"), 1);
        var headers = Object.keys(allHeaders).filter(function (header) {
            switch (header.toLowerCase()) {
                case 'content-type':
                case 'content-length':
                case 'accept-encoding':
                    // skip these headers
                    return false;
                default:
                    return true;
            }
        });
        if (headers.length) {
            push('Headers =', 1);
            push('{', 1);
            headers.forEach(function (key) {
                push("{ \"".concat(key, "\", \"").concat((0, escape_1.escapeForDoubleQuotes)(allHeaders[key]), "\" },"), 2);
            });
            push('},', 1);
        }
        if (postData.text) {
            var contentType = postData.mimeType;
            switch (contentType) {
                case 'application/x-www-form-urlencoded':
                    push('Content = new FormUrlEncodedContent(new Dictionary<string, string>', 1);
                    push('{', 1);
                    (_b = postData.params) === null || _b === void 0 ? void 0 : _b.forEach(function (param) {
                        push("{ \"".concat(param.name, "\", \"").concat(param.value, "\" },"), 2);
                    });
                    push('}),', 1);
                    break;
                case 'multipart/form-data':
                    push('Content = new MultipartFormDataContent', 1);
                    push('{', 1);
                    (_c = postData.params) === null || _c === void 0 ? void 0 : _c.forEach(function (param) {
                        push("new StringContent(".concat(JSON.stringify(param.value || ''), ")"), 2);
                        push('{', 2);
                        push('Headers =', 3);
                        push('{', 3);
                        if (param.contentType) {
                            push("ContentType = new MediaTypeHeaderValue(\"".concat(param.contentType, "\"),"), 4);
                        }
                        push('ContentDisposition = new ContentDispositionHeaderValue("form-data")', 4);
                        push('{', 4);
                        push("Name = \"".concat(param.name, "\","), 5);
                        if (param.fileName) {
                            push("FileName = \"".concat(param.fileName, "\","), 5);
                        }
                        push('}', 4);
                        push('}', 3);
                        push('},', 2);
                    });
                    push('},', 1);
                    break;
                default:
                    push("Content = new StringContent(".concat(JSON.stringify(postData.text || ''), ")"), 1);
                    push('{', 1);
                    push('Headers =', 2);
                    push('{', 2);
                    push("ContentType = new MediaTypeHeaderValue(\"".concat(contentType, "\")"), 3);
                    push('}', 2);
                    push('}', 1);
                    break;
            }
        }
        push('};');
        // send and read response
        push('using (var response = await client.SendAsync(request))');
        push('{');
        push('response.EnsureSuccessStatusCode();', 1);
        push('var body = await response.Content.ReadAsStringAsync();', 1);
        push('Console.WriteLine(body);', 1);
        push('}');
        return join();
    }
};
