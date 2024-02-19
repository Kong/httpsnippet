"use strict";
/**
 * @description
 * HTTP code snippet generator for Node.js using Request.
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
exports.request = void 0;
var stringify_object_1 = __importDefault(require("stringify-object"));
var code_builder_1 = require("../../../helpers/code-builder");
exports.request = {
    info: {
        key: 'request',
        title: 'Request',
        link: 'https://github.com/request/request',
        description: 'Simplified HTTP request client'
    },
    convert: function (_a, options) {
        var method = _a.method, url = _a.url, queryObj = _a.queryObj, postData = _a.postData, headersObj = _a.headersObj, cookies = _a.cookies;
        var opts = __assign({ indent: '  ' }, options);
        var includeFS = false;
        var _b = new code_builder_1.CodeBuilder({ indent: opts.indent }), push = _b.push, blank = _b.blank, join = _b.join, unshift = _b.unshift;
        push("const request = require('request');");
        blank();
        var reqOpts = {
            method: method,
            url: url
        };
        if (Object.keys(queryObj).length) {
            reqOpts.qs = queryObj;
        }
        if (Object.keys(headersObj).length) {
            reqOpts.headers = headersObj;
        }
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                reqOpts.form = postData.paramsObj;
                break;
            case 'application/json':
                if (postData.jsonObj) {
                    reqOpts.body = postData.jsonObj;
                    reqOpts.json = true;
                }
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                reqOpts.formData = {};
                postData.params.forEach(function (param) {
                    if (!param.fileName && !param.fileName && !param.contentType) {
                        reqOpts.formData[param.name] = param.value;
                        return;
                    }
                    var attachment = {};
                    if (param.fileName) {
                        includeFS = true;
                        attachment = {
                            value: "fs.createReadStream(".concat(param.fileName, ")"),
                            options: {
                                filename: param.fileName,
                                contentType: param.contentType ? param.contentType : null
                            }
                        };
                    }
                    else if (param.value) {
                        attachment.value = param.value;
                    }
                    reqOpts.formData[param.name] = attachment;
                });
                break;
            default:
                if (postData.text) {
                    reqOpts.body = postData.text;
                }
        }
        // construct cookies argument
        if (cookies.length) {
            reqOpts.jar = 'JAR';
            push('const jar = request.jar();');
            cookies.forEach(function (cookie) {
                push("jar.setCookie(request.cookie('".concat(encodeURIComponent(cookie.name), "=").concat(encodeURIComponent(cookie.value), "'), '").concat(url, "');"));
            });
            blank();
        }
        if (includeFS) {
            unshift("const fs = require('fs');");
        }
        push("const options = ".concat((0, stringify_object_1["default"])(reqOpts, { indent: '  ', inlineCharacterLimit: 80 }), ";"));
        blank();
        push('request(options, function (error, response, body) {');
        push('if (error) throw new Error(error);', 1);
        blank();
        push('console.log(body);', 1);
        push('});');
        return join()
            .replace("'JAR'", 'jar')
            .replace(/'fs\.createReadStream\((.*)\)'/, "fs.createReadStream('$1')");
    }
};
