"use strict";
exports.__esModule = true;
exports.native = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
exports.native = {
    info: {
        key: 'native',
        title: 'net::http',
        link: 'http://ruby-doc.org/stdlib-2.2.1/libdoc/net/http/rdoc/Net/HTTP.html',
        description: 'Ruby HTTP client'
    },
    convert: function (_a, options) {
        var uriObj = _a.uriObj, rawMethod = _a.method, fullUrl = _a.fullUrl, postData = _a.postData, allHeaders = _a.allHeaders;
        if (options === void 0) { options = {}; }
        var _b = options.insecureSkipVerify, insecureSkipVerify = _b === void 0 ? false : _b;
        var _c = new code_builder_1.CodeBuilder(), push = _c.push, blank = _c.blank, join = _c.join;
        push("require 'uri'");
        push("require 'net/http'");
        blank();
        // To support custom methods we check for the supported methods
        // and if doesn't exist then we build a custom class for it
        var method = rawMethod.toUpperCase();
        var methods = [
            'GET',
            'POST',
            'HEAD',
            'DELETE',
            'PATCH',
            'PUT',
            'OPTIONS',
            'COPY',
            'LOCK',
            'UNLOCK',
            'MOVE',
            'TRACE',
        ];
        var capMethod = method.charAt(0) + method.substring(1).toLowerCase();
        if (!methods.includes(method)) {
            push("class Net::HTTP::".concat(capMethod, " < Net::HTTPRequest"));
            push("  METHOD = '".concat(method.toUpperCase(), "'"));
            push("  REQUEST_HAS_BODY = '".concat(postData.text ? 'true' : 'false', "'"));
            push('  RESPONSE_HAS_BODY = true');
            push('end');
            blank();
        }
        push("url = URI(\"".concat(fullUrl, "\")"));
        blank();
        push('http = Net::HTTP.new(url.host, url.port)');
        if (uriObj.protocol === 'https:') {
            push('http.use_ssl = true');
            if (insecureSkipVerify) {
                push('http.verify_mode = OpenSSL::SSL::VERIFY_NONE');
            }
        }
        blank();
        push("request = Net::HTTP::".concat(capMethod, ".new(url)"));
        var headers = Object.keys(allHeaders);
        if (headers.length) {
            headers.forEach(function (key) {
                push("request[\"".concat(key, "\"] = '").concat((0, escape_1.escapeForSingleQuotes)(allHeaders[key]), "'"));
            });
        }
        if (postData.text) {
            push("request.body = ".concat(JSON.stringify(postData.text)));
        }
        blank();
        push('response = http.request(request)');
        push('puts response.read_body');
        return join();
    }
};
