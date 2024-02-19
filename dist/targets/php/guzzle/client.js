"use strict";
/**
 * @description
 * HTTP code snippet generator for PHP using Guzzle.
 *
 * @author @RobertoArruda
 * @author @erunion
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
exports.guzzle = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
var headers_1 = require("../../../helpers/headers");
var helpers_1 = require("../helpers");
exports.guzzle = {
    info: {
        key: 'guzzle',
        title: 'Guzzle',
        link: 'http://docs.guzzlephp.org/en/stable/',
        description: 'PHP with Guzzle'
    },
    convert: function (_a, options) {
        var _b;
        var postData = _a.postData, fullUrl = _a.fullUrl, method = _a.method, cookies = _a.cookies, headersObj = _a.headersObj;
        var opts = __assign({ closingTag: false, indent: '  ', noTags: false, shortTags: false }, options);
        var _c = new code_builder_1.CodeBuilder({ indent: opts.indent }), push = _c.push, blank = _c.blank, join = _c.join;
        var _d = new code_builder_1.CodeBuilder({ indent: opts.indent }), requestCode = _d.code, requestPush = _d.push, requestJoin = _d.join;
        if (!opts.noTags) {
            push(opts.shortTags ? '<?' : '<?php');
            blank();
        }
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                requestPush("'form_params' => ".concat((0, helpers_1.convertType)(postData.paramsObj, opts.indent + opts.indent, opts.indent), ","), 1);
                break;
            case 'multipart/form-data': {
                var fields_1 = [];
                if (postData.params) {
                    postData.params.forEach(function (param) {
                        if (param.fileName) {
                            var field = {
                                name: param.name,
                                filename: param.fileName,
                                contents: param.value
                            };
                            if (param.contentType) {
                                field.headers = { 'Content-Type': param.contentType };
                            }
                            fields_1.push(field);
                        }
                        else if (param.value) {
                            fields_1.push({
                                name: param.name,
                                contents: param.value
                            });
                        }
                    });
                }
                if (fields_1.length) {
                    requestPush("'multipart' => ".concat((0, helpers_1.convertType)(fields_1, opts.indent + opts.indent, opts.indent)), 1);
                    // Guzzle adds its own boundary for multipart requests.
                    if ((0, headers_1.hasHeader)(headersObj, 'content-type')) {
                        if ((_b = (0, headers_1.getHeader)(headersObj, 'content-type')) === null || _b === void 0 ? void 0 : _b.indexOf('boundary')) {
                            var headerName = (0, headers_1.getHeaderName)(headersObj, 'content-type');
                            if (headerName) {
                                delete headersObj[headerName];
                            }
                        }
                    }
                }
                break;
            }
            default:
                if (postData.text) {
                    requestPush("'body' => ".concat((0, helpers_1.convertType)(postData.text), ","), 1);
                }
        }
        // construct headers
        var headers = Object.keys(headersObj)
            .sort()
            .map(function (key) {
            return "".concat(opts.indent).concat(opts.indent, "'").concat(key, "' => '").concat((0, escape_1.escapeForSingleQuotes)(headersObj[key]), "',");
        });
        // construct cookies
        var cookieString = cookies
            .map(function (cookie) { return "".concat(encodeURIComponent(cookie.name), "=").concat(encodeURIComponent(cookie.value)); })
            .join('; ');
        if (cookieString.length) {
            headers.push("".concat(opts.indent).concat(opts.indent, "'cookie' => '").concat((0, escape_1.escapeForSingleQuotes)(cookieString), "',"));
        }
        if (headers.length) {
            requestPush("'headers' => [", 1);
            requestPush(headers.join('\n'));
            requestPush('],', 1);
        }
        push('$client = new \\GuzzleHttp\\Client();');
        blank();
        if (requestCode.length) {
            push("$response = $client->request('".concat(method, "', '").concat(fullUrl, "', ["));
            push(requestJoin());
            push(']);');
        }
        else {
            push("$response = $client->request('".concat(method, "', '").concat(fullUrl, "');"));
        }
        blank();
        push('echo $response->getBody();');
        if (!opts.noTags && opts.closingTag) {
            blank();
            push('?>');
        }
        return join();
    }
};
