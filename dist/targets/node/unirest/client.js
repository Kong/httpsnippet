"use strict";
/**
 * @description
 * HTTP code snippet generator for Node.js using Unirest.
 *
 * @author
 * @AhmadNassri
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
exports.unirest = void 0;
var stringify_object_1 = __importDefault(require("stringify-object"));
var code_builder_1 = require("../../../helpers/code-builder");
exports.unirest = {
    info: {
        key: 'unirest',
        title: 'Unirest',
        link: 'http://unirest.io/nodejs.html',
        description: 'Lightweight HTTP Request Client Library'
    },
    convert: function (_a, options) {
        var method = _a.method, url = _a.url, cookies = _a.cookies, queryObj = _a.queryObj, postData = _a.postData, headersObj = _a.headersObj;
        var opts = __assign({ indent: '  ' }, options);
        var includeFS = false;
        var _b = new code_builder_1.CodeBuilder({
            indent: opts.indent
        }), addPostProcessor = _b.addPostProcessor, blank = _b.blank, join = _b.join, push = _b.push, unshift = _b.unshift;
        push("const unirest = require('unirest');");
        blank();
        push("const req = unirest('".concat(method, "', '").concat(url, "');"));
        blank();
        if (cookies.length) {
            push('const CookieJar = unirest.jar();');
            cookies.forEach(function (cookie) {
                push("CookieJar.add('".concat(encodeURIComponent(cookie.name), "=").concat(encodeURIComponent(cookie.value), "', '").concat(url, "');"));
            });
            push('req.jar(CookieJar);');
            blank();
        }
        if (Object.keys(queryObj).length) {
            push("req.query(".concat((0, stringify_object_1["default"])(queryObj, { indent: opts.indent }), ");"));
            blank();
        }
        if (Object.keys(headersObj).length) {
            push("req.headers(".concat((0, stringify_object_1["default"])(headersObj, { indent: opts.indent }), ");"));
            blank();
        }
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                if (postData.paramsObj) {
                    push("req.form(".concat((0, stringify_object_1["default"])(postData.paramsObj, { indent: opts.indent }), ");"));
                    blank();
                }
                break;
            case 'application/json':
                if (postData.jsonObj) {
                    push("req.type('json');");
                    push("req.send(".concat((0, stringify_object_1["default"])(postData.jsonObj, { indent: opts.indent }), ");"));
                    blank();
                }
                break;
            case 'multipart/form-data': {
                if (!postData.params) {
                    break;
                }
                var multipart_1 = [];
                postData.params.forEach(function (param) {
                    var part = {};
                    if (param.fileName && !param.value) {
                        includeFS = true;
                        part.body = "fs.createReadStream('".concat(param.fileName, "')");
                        addPostProcessor(function (code) {
                            return code.replace(/'fs\.createReadStream\(\\'(.+)\\'\)'/, "fs.createReadStream('$1')");
                        });
                    }
                    else if (param.value) {
                        part.body = param.value;
                    }
                    if (part.body) {
                        if (param.contentType) {
                            part['content-type'] = param.contentType;
                        }
                        multipart_1.push(part);
                    }
                });
                push("req.multipart(".concat((0, stringify_object_1["default"])(multipart_1, { indent: opts.indent }), ");"));
                blank();
                break;
            }
            default:
                if (postData.text) {
                    push("req.send(".concat((0, stringify_object_1["default"])(postData.text, { indent: opts.indent }), ");"));
                    blank();
                }
        }
        if (includeFS) {
            unshift("const fs = require('fs');");
        }
        push('req.end(function (res) {');
        push('if (res.error) throw new Error(res.error);', 1);
        blank();
        push('console.log(res.body);', 1);
        push('});');
        return join();
    }
};
