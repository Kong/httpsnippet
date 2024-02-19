"use strict";
/**
 * @description
 * HTTP code snippet generator for fetch
 *
 * @author
 * @pmdroid
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
        title: 'fetch',
        link: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
        description: 'Perform asynchronous HTTP requests with the Fetch API'
    },
    convert: function (_a, inputOpts) {
        var method = _a.method, allHeaders = _a.allHeaders, postData = _a.postData, fullUrl = _a.fullUrl;
        var opts = __assign({ indent: '  ', credentials: null }, inputOpts);
        var _b = new code_builder_1.CodeBuilder({ indent: opts.indent }), blank = _b.blank, join = _b.join, push = _b.push;
        var options = {
            method: method
        };
        if (Object.keys(allHeaders).length) {
            options.headers = allHeaders;
        }
        if (opts.credentials !== null) {
            options.credentials = opts.credentials;
        }
        push("const url = '".concat(fullUrl, "';"));
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                options.body = postData.paramsObj ? postData.paramsObj : postData.text;
                break;
            case 'application/json':
                options.body = JSON.stringify(postData.jsonObj);
                break;
            case 'multipart/form-data':
                if (!postData.params) {
                    break;
                }
                // The FormData API automatically adds a `Content-Type` header for `multipart/form-data` content and if we add our own here data won't be correctly transmitted.
                // eslint-disable-next-line no-case-declarations -- We're only using `contentTypeHeader` within this block.
                var contentTypeHeader = (0, headers_1.getHeaderName)(allHeaders, 'content-type');
                if (contentTypeHeader) {
                    delete allHeaders[contentTypeHeader];
                }
                push('const form = new FormData();');
                postData.params.forEach(function (param) {
                    push("form.append('".concat(param.name, "', '").concat(param.value || param.fileName || '', "');"));
                });
                blank();
                break;
            default:
                if (postData.text) {
                    options.body = postData.text;
                }
        }
        // If we ultimately don't have any headers to send then we shouldn't add an empty object into the request options.
        if (options.headers && !Object.keys(options.headers).length) {
            delete options.headers;
        }
        push("const options = ".concat((0, stringify_object_1["default"])(options, {
            indent: opts.indent,
            inlineCharacterLimit: 80,
            transform: function (_, property, originalResult) {
                if (property === 'body' && postData.mimeType === 'application/x-www-form-urlencoded') {
                    return "new URLSearchParams(".concat(originalResult, ")");
                }
                return originalResult;
            }
        }), ";"));
        blank();
        if (postData.params && postData.mimeType === 'multipart/form-data') {
            push('options.body = form;');
            blank();
        }
        push('try {');
        push("const response = await fetch(url, options);", 1);
        push('const data = await response.json();', 1);
        push('console.log(data);', 1);
        push('} catch (error) {');
        push('console.error(error);', 1);
        push('}');
        return join();
    }
};
