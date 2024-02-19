"use strict";
/**
 * @description
 * HTTP code snippet generator for Node.js using node-fetch.
 *
 * @author
 * @hirenoble
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fetch = void 0;
var stringify_object_1 = __importDefault(require("stringify-object"));
var code_builder_1 = require("../../../helpers/code-builder");
var headers_1 = require("../../../helpers/headers");
exports.fetch = {
    info: {
        key: 'fetch',
        title: 'Fetch',
        link: 'https://github.com/bitinn/node-fetch',
        description: 'Simplified HTTP node-fetch client'
    },
    convert: function (_a, options) {
        var _b;
        var method = _a.method, fullUrl = _a.fullUrl, postData = _a.postData, headersObj = _a.headersObj, cookies = _a.cookies;
        var opts = __assign({ indent: '  ' }, options);
        var includeFS = false;
        var _c = new code_builder_1.CodeBuilder({ indent: opts.indent }), blank = _c.blank, push = _c.push, join = _c.join, unshift = _c.unshift;
        push("const fetch = require('node-fetch');");
        blank();
        var reqOpts = {
            method: method
        };
        if (Object.keys(headersObj).length) {
            reqOpts.headers = headersObj;
        }
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                unshift("const { URLSearchParams } = require('url');");
                push('const encodedParams = new URLSearchParams();');
                (_b = postData.params) === null || _b === void 0 ? void 0 : _b.forEach(function (param) {
                    push("encodedParams.set('".concat(param.name, "', '").concat(param.value, "');"));
                });
                blank();
                reqOpts.body = 'encodedParams';
                break;
            case 'application/json':
                if (postData.jsonObj) {
                    reqOpts.body = JSON.stringify(postData.jsonObj);
                }
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                // The `form-data` module automatically adds a `Content-Type` header for `multipart/form-data` content and if we add our own here data won't be correctly transmitted.
                // eslint-disable-next-line no-case-declarations -- We're only using `contentTypeHeader` within this block.
                var contentTypeHeader = (0, headers_1.getHeaderName)(headersObj, 'content-type');
                if (contentTypeHeader) {
                    delete headersObj[contentTypeHeader];
                }
                unshift("const FormData = require('form-data');");
                push('const formData = new FormData();');
                postData.params.forEach(function (param) {
                    if (!param.fileName && !param.fileName && !param.contentType) {
                        push("formData.append('".concat(param.name, "', '").concat(param.value, "');"));
                        return;
                    }
                    if (param.fileName) {
                        includeFS = true;
                        push("formData.append('".concat(param.name, "', fs.createReadStream('").concat(param.fileName, "'));"));
                    }
                });
                blank();
                break;
            default:
                if (postData.text) {
                    reqOpts.body = postData.text;
                }
        }
        // construct cookies argument
        if (cookies.length) {
            var cookiesString = cookies
                .map(function (cookie) { return "".concat(encodeURIComponent(cookie.name), "=").concat(encodeURIComponent(cookie.value)); })
                .join('; ');
            if (reqOpts.headers) {
                reqOpts.headers.cookie = cookiesString;
            }
            else {
                reqOpts.headers = {};
                reqOpts.headers.cookie = cookiesString;
            }
        }
        push("const url = '".concat(fullUrl, "';"));
        // If we ultimately don't have any headers to send then we shouldn't add an empty object into the request options.
        if (reqOpts.headers && !Object.keys(reqOpts.headers).length) {
            delete reqOpts.headers;
        }
        var stringifiedOptions = (0, stringify_object_1["default"])(reqOpts, { indent: '  ', inlineCharacterLimit: 80 });
        push("const options = ".concat(stringifiedOptions, ";"));
        if (includeFS) {
            unshift("const fs = require('fs');");
        }
        if (postData.params && postData.mimeType === 'multipart/form-data') {
            push('options.body = formData;');
        }
        blank();
        push('try {');
        push("const response = await fetch(url, options);", 1);
        push('const data = await response.json();', 1);
        push('console.log(data);', 1);
        push('} catch (error) {');
        push('console.error(error);', 1);
        push('}');
        return join()
            .replace(/'encodedParams'/, 'encodedParams')
            .replace(/"fs\.createReadStream\(\\"(.+)\\"\)"/, 'fs.createReadStream("$1")');
    }
};
