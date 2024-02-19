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
exports.jquery = void 0;
var stringify_object_1 = __importDefault(require("stringify-object"));
var code_builder_1 = require("../../../helpers/code-builder");
var headers_1 = require("../../../helpers/headers");
exports.jquery = {
    info: {
        key: 'jquery',
        title: 'jQuery',
        link: 'http://api.jquery.com/jquery.ajax/',
        description: 'Perform an asynchronous HTTP (Ajax) requests with jQuery'
    },
    convert: function (_a, options) {
        var _b;
        var fullUrl = _a.fullUrl, method = _a.method, allHeaders = _a.allHeaders, postData = _a.postData;
        var opts = __assign({ indent: '  ' }, options);
        var _c = new code_builder_1.CodeBuilder({ indent: opts.indent }), blank = _c.blank, push = _c.push, join = _c.join;
        var settings = {
            async: true,
            crossDomain: true,
            url: fullUrl,
            method: method,
            headers: allHeaders
        };
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                settings.data = postData.paramsObj ? postData.paramsObj : postData.text;
                break;
            case 'application/json':
                settings.processData = false;
                settings.data = postData.text;
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                push('const form = new FormData();');
                postData.params.forEach(function (param) {
                    push("form.append('".concat(param.name, "', '").concat(param.value || param.fileName || '', "');"));
                });
                settings.processData = false;
                settings.contentType = false;
                settings.mimeType = 'multipart/form-data';
                settings.data = '[form]';
                // remove the contentType header
                if ((0, headers_1.hasHeader)(allHeaders, 'content-type')) {
                    if ((_b = (0, headers_1.getHeader)(allHeaders, 'content-type')) === null || _b === void 0 ? void 0 : _b.includes('boundary')) {
                        var headerName = (0, headers_1.getHeaderName)(allHeaders, 'content-type');
                        if (headerName) {
                            delete settings.headers[headerName];
                        }
                    }
                }
                blank();
                break;
            default:
                if (postData.text) {
                    settings.data = postData.text;
                }
        }
        var stringifiedSettings = (0, stringify_object_1["default"])(settings, { indent: opts.indent }).replace("'[form]'", 'form');
        push("const settings = ".concat(stringifiedSettings, ";"));
        blank();
        push('$.ajax(settings).done(function (response) {');
        push('console.log(response);', 1);
        push('});');
        return join();
    }
};
