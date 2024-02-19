"use strict";
/**
 * @description
 * HTTP code snippet generator for native XMLHttpRequest
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
exports.xhr = void 0;
var stringify_object_1 = __importDefault(require("stringify-object"));
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
var headers_1 = require("../../../helpers/headers");
exports.xhr = {
    info: {
        key: 'xhr',
        title: 'XMLHttpRequest',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest',
        description: 'W3C Standard API that provides scripted client functionality'
    },
    convert: function (_a, options) {
        var _b;
        var postData = _a.postData, allHeaders = _a.allHeaders, method = _a.method, fullUrl = _a.fullUrl;
        var opts = __assign({ indent: '  ', cors: true }, options);
        var _c = new code_builder_1.CodeBuilder({ indent: opts.indent }), blank = _c.blank, push = _c.push, join = _c.join;
        switch (postData.mimeType) {
            case 'application/json':
                push("const data = JSON.stringify(".concat((0, stringify_object_1["default"])(postData.jsonObj, {
                    indent: opts.indent
                }), ");"));
                blank();
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                push('const data = new FormData();');
                postData.params.forEach(function (param) {
                    push("data.append('".concat(param.name, "', '").concat(param.value || param.fileName || '', "');"));
                });
                // remove the contentType header
                if ((0, headers_1.hasHeader)(allHeaders, 'content-type')) {
                    if ((_b = (0, headers_1.getHeader)(allHeaders, 'content-type')) === null || _b === void 0 ? void 0 : _b.includes('boundary')) {
                        var headerName = (0, headers_1.getHeaderName)(allHeaders, 'content-type');
                        if (headerName) {
                            delete allHeaders[headerName];
                        }
                    }
                }
                blank();
                break;
            default:
                push("const data = ".concat(postData.text ? "'".concat(postData.text, "'") : 'null', ";"));
                blank();
        }
        push('const xhr = new XMLHttpRequest();');
        if (opts.cors) {
            push('xhr.withCredentials = true;');
        }
        blank();
        push("xhr.addEventListener('readystatechange', function () {");
        push('if (this.readyState === this.DONE) {', 1);
        push('console.log(this.responseText);', 2);
        push('}', 1);
        push('});');
        blank();
        push("xhr.open('".concat(method, "', '").concat(fullUrl, "');"));
        Object.keys(allHeaders).forEach(function (key) {
            push("xhr.setRequestHeader('".concat(key, "', '").concat((0, escape_1.escapeForSingleQuotes)(allHeaders[key]), "');"));
        });
        blank();
        push('xhr.send(data);');
        return join();
    }
};
