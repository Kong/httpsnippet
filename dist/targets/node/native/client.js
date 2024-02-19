"use strict";
/**
 * @description
 * HTTP code snippet generator for native Node.js.
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
exports.native = void 0;
var stringify_object_1 = __importDefault(require("stringify-object"));
var code_builder_1 = require("../../../helpers/code-builder");
exports.native = {
    info: {
        key: 'native',
        title: 'HTTP',
        link: 'http://nodejs.org/api/http.html#http_http_request_options_callback',
        description: 'Node.js native HTTP interface'
    },
    convert: function (_a, options) {
        var uriObj = _a.uriObj, method = _a.method, allHeaders = _a.allHeaders, postData = _a.postData;
        if (options === void 0) { options = {}; }
        var _b = options.indent, indent = _b === void 0 ? '  ' : _b, _c = options.insecureSkipVerify, insecureSkipVerify = _c === void 0 ? false : _c;
        var _d = new code_builder_1.CodeBuilder({ indent: indent }), blank = _d.blank, join = _d.join, push = _d.push, unshift = _d.unshift;
        var reqOpts = __assign({ method: method, hostname: uriObj.hostname, port: uriObj.port, path: uriObj.path, headers: allHeaders }, (insecureSkipVerify ? { rejectUnauthorized: false } : {}));
        // @ts-expect-error TODO seems like a legit error
        push("const http = require('".concat(uriObj.protocol.replace(':', ''), "');"));
        blank();
        push("const options = ".concat((0, stringify_object_1["default"])(reqOpts, { indent: indent }), ";"));
        blank();
        push('const req = http.request(options, function (res) {');
        push('const chunks = [];', 1);
        blank();
        push("res.on('data', function (chunk) {", 1);
        push('chunks.push(chunk);', 2);
        push('});', 1);
        blank();
        push("res.on('end', function () {", 1);
        push('const body = Buffer.concat(chunks);', 2);
        push('console.log(body.toString());', 2);
        push('});', 1);
        push('});');
        blank();
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                if (postData.paramsObj) {
                    unshift("const qs = require('querystring');");
                    push("req.write(qs.stringify(".concat((0, stringify_object_1["default"])(postData.paramsObj, {
                        indent: '  ',
                        inlineCharacterLimit: 80
                    }), "));"));
                }
                break;
            case 'application/json':
                if (postData.jsonObj) {
                    push("req.write(JSON.stringify(".concat((0, stringify_object_1["default"])(postData.jsonObj, {
                        indent: '  ',
                        inlineCharacterLimit: 80
                    }), "));"));
                }
                break;
            default:
                if (postData.text) {
                    push("req.write(".concat((0, stringify_object_1["default"])(postData.text, { indent: indent }), ");"));
                }
        }
        push('req.end();');
        return join();
    }
};
