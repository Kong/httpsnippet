"use strict";
exports.__esModule = true;
exports.libcurl = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
exports.libcurl = {
    info: {
        key: 'libcurl',
        title: 'Libcurl',
        link: 'http://curl.haxx.se/libcurl',
        description: 'Simple REST and HTTP API Client for C'
    },
    convert: function (_a) {
        var method = _a.method, fullUrl = _a.fullUrl, headersObj = _a.headersObj, allHeaders = _a.allHeaders, postData = _a.postData;
        var _b = new code_builder_1.CodeBuilder(), push = _b.push, blank = _b.blank, join = _b.join;
        push('CURL *hnd = curl_easy_init();');
        blank();
        push("curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, \"".concat(method.toUpperCase(), "\");"));
        push("curl_easy_setopt(hnd, CURLOPT_URL, \"".concat(fullUrl, "\");"));
        // Add headers, including the cookies
        var headers = Object.keys(headersObj);
        // construct headers
        if (headers.length) {
            blank();
            push('struct curl_slist *headers = NULL;');
            headers.forEach(function (header) {
                push("headers = curl_slist_append(headers, \"".concat(header, ": ").concat((0, escape_1.escapeForDoubleQuotes)(headersObj[header]), "\");"));
            });
            push('curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);');
        }
        // construct cookies
        if (allHeaders.cookie) {
            blank();
            push("curl_easy_setopt(hnd, CURLOPT_COOKIE, \"".concat(allHeaders.cookie, "\");"));
        }
        if (postData.text) {
            blank();
            push("curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, ".concat(JSON.stringify(postData.text), ");"));
        }
        blank();
        push('CURLcode ret = curl_easy_perform(hnd);');
        return join();
    }
};
