"use strict";
/**
 * @description
 * HTTP code snippet generator for Javascript & Node.js using Axios.
 *
 * @author
 * @rohit-gohri
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
exports.axios = void 0;
var stringify_object_1 = __importDefault(require("stringify-object"));
var code_builder_1 = require("../../../helpers/code-builder");
exports.axios = {
    info: {
        key: 'axios',
        title: 'Axios',
        link: 'https://github.com/axios/axios',
        description: 'Promise based HTTP client for the browser and node.js'
    },
    convert: function (_a, options) {
        var method = _a.method, url = _a.url, queryObj = _a.queryObj, allHeaders = _a.allHeaders, postData = _a.postData;
        var opts = __assign({ indent: '  ' }, options);
        var _b = new code_builder_1.CodeBuilder({ indent: opts.indent }), blank = _b.blank, join = _b.join, push = _b.push, addPostProcessor = _b.addPostProcessor;
        push("const axios = require('axios').default;");
        var reqOpts = {
            method: method,
            url: url
        };
        if (Object.keys(queryObj).length) {
            reqOpts.params = queryObj;
        }
        if (Object.keys(allHeaders).length) {
            reqOpts.headers = allHeaders;
        }
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                if (postData.params) {
                    push("const { URLSearchParams } = require('url');");
                    blank();
                    push('const encodedParams = new URLSearchParams();');
                    postData.params.forEach(function (param) {
                        push("encodedParams.set('".concat(param.name, "', '").concat(param.value, "');"));
                    });
                    blank();
                    reqOpts.data = 'encodedParams,';
                    addPostProcessor(function (code) { return code.replace(/'encodedParams,'/, 'encodedParams,'); });
                }
                break;
            case 'application/json':
                blank();
                if (postData.jsonObj) {
                    reqOpts.data = postData.jsonObj;
                }
                break;
            default:
                blank();
                if (postData.text) {
                    reqOpts.data = postData.text;
                }
        }
        var stringifiedOptions = (0, stringify_object_1["default"])(reqOpts, { indent: '  ', inlineCharacterLimit: 80 });
        push("const options = ".concat(stringifiedOptions, ";"));
        blank();
        push('try {');
        push('const { data } = await axios.request(options);', 1);
        push('console.log(data);', 1);
        push('} catch (error) {');
        push('console.error(error);', 1);
        push('}');
        return join();
    }
};
