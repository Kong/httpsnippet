"use strict";
/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
exports.__esModule = true;
exports.curl = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
var helpers_1 = require("../helpers");
exports.curl = {
    info: {
        key: 'curl',
        title: 'cURL',
        link: 'http://php.net/manual/en/book.curl.php',
        description: 'PHP with ext-curl'
    },
    convert: function (_a, options) {
        var uriObj = _a.uriObj, postData = _a.postData, fullUrl = _a.fullUrl, method = _a.method, httpVersion = _a.httpVersion, cookies = _a.cookies, headersObj = _a.headersObj;
        if (options === void 0) { options = {}; }
        var _b = options.closingTag, closingTag = _b === void 0 ? false : _b, _c = options.indent, indent = _c === void 0 ? '  ' : _c, _d = options.maxRedirects, maxRedirects = _d === void 0 ? 10 : _d, _e = options.namedErrors, namedErrors = _e === void 0 ? false : _e, _f = options.noTags, noTags = _f === void 0 ? false : _f, _g = options.shortTags, shortTags = _g === void 0 ? false : _g, _h = options.timeout, timeout = _h === void 0 ? 30 : _h;
        var _j = new code_builder_1.CodeBuilder({ indent: indent }), push = _j.push, blank = _j.blank, join = _j.join;
        if (!noTags) {
            push(shortTags ? '<?' : '<?php');
            blank();
        }
        push('$curl = curl_init();');
        blank();
        var curlOptions = [
            {
                escape: true,
                name: 'CURLOPT_PORT',
                value: uriObj.port
            },
            {
                escape: true,
                name: 'CURLOPT_URL',
                value: fullUrl
            },
            {
                escape: false,
                name: 'CURLOPT_RETURNTRANSFER',
                value: 'true'
            },
            {
                escape: true,
                name: 'CURLOPT_ENCODING',
                value: ''
            },
            {
                escape: false,
                name: 'CURLOPT_MAXREDIRS',
                value: maxRedirects
            },
            {
                escape: false,
                name: 'CURLOPT_TIMEOUT',
                value: timeout
            },
            {
                escape: false,
                name: 'CURLOPT_HTTP_VERSION',
                value: httpVersion === 'HTTP/1.0' ? 'CURL_HTTP_VERSION_1_0' : 'CURL_HTTP_VERSION_1_1'
            },
            {
                escape: true,
                name: 'CURLOPT_CUSTOMREQUEST',
                value: method
            },
            {
                escape: !postData.jsonObj,
                name: 'CURLOPT_POSTFIELDS',
                value: postData
                    ? postData.jsonObj
                        ? "json_encode(".concat((0, helpers_1.convertType)(postData.jsonObj, indent.repeat(2), indent), ")")
                        : postData.text
                    : undefined
            },
        ];
        push('curl_setopt_array($curl, [');
        var curlopts = new code_builder_1.CodeBuilder({ indent: indent, join: "\n".concat(indent) });
        curlOptions.forEach(function (_a) {
            var value = _a.value, name = _a.name, escape = _a.escape;
            if (value !== null && value !== undefined) {
                curlopts.push("".concat(name, " => ").concat(escape ? JSON.stringify(value) : value, ","));
            }
        });
        // construct cookies
        var curlCookies = cookies.map(function (cookie) { return "".concat(encodeURIComponent(cookie.name), "=").concat(encodeURIComponent(cookie.value)); });
        if (curlCookies.length) {
            curlopts.push("CURLOPT_COOKIE => \"".concat(curlCookies.join('; '), "\","));
        }
        // construct cookies
        var headers = Object.keys(headersObj)
            .sort()
            .map(function (key) { return "\"".concat(key, ": ").concat((0, escape_1.escapeForDoubleQuotes)(headersObj[key]), "\""); });
        if (headers.length) {
            curlopts.push('CURLOPT_HTTPHEADER => [');
            curlopts.push(headers.join(",\n".concat(indent).concat(indent)), 1);
            curlopts.push('],');
        }
        push(curlopts.join(), 1);
        push(']);');
        blank();
        push('$response = curl_exec($curl);');
        push('$err = curl_error($curl);');
        blank();
        push('curl_close($curl);');
        blank();
        push('if ($err) {');
        if (namedErrors) {
            push('echo array_flip(get_defined_constants(true)["curl"])[$err];', 1);
        }
        else {
            push('echo "cURL Error #:" . $err;', 1);
        }
        push('} else {');
        push('echo $response;', 1);
        push('}');
        if (!noTags && closingTag) {
            blank();
            push('?>');
        }
        return join();
    }
};
