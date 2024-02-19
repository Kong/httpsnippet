"use strict";
/**
 * @description
 * HTTP code snippet generator for Clojure using clj-http.
 *
 * @author
 * @tggreene
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
exports.__esModule = true;
exports.clj_http = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var headers_1 = require("../../../helpers/headers");
var Keyword = /** @class */ (function () {
    function Keyword(name) {
        var _this = this;
        this.name = '';
        this.toString = function () { return ":".concat(_this.name); };
        this.name = name;
    }
    return Keyword;
}());
var File = /** @class */ (function () {
    function File(path) {
        var _this = this;
        this.path = '';
        this.toString = function () { return "(clojure.java.io/file \"".concat(_this.path, "\")"); };
        this.path = path;
    }
    return File;
}());
var jsType = function (input) {
    if (input === undefined) {
        return null;
    }
    if (input === null) {
        return 'null';
    }
    return input.constructor.name.toLowerCase();
};
var objEmpty = function (input) {
    if (jsType(input) === 'object') {
        return Object.keys(input).length === 0;
    }
    return false;
};
var filterEmpty = function (input) {
    Object.keys(input)
        .filter(function (x) { return objEmpty(input[x]); })
        .forEach(function (x) {
        delete input[x];
    });
    return input;
};
var padBlock = function (padSize, input) {
    var padding = ' '.repeat(padSize);
    return input.replace(/\n/g, "\n".concat(padding));
};
var jsToEdn = function (js) {
    switch (jsType(js)) {
        case 'string':
            return "\"".concat(js.replace(/"/g, '\\"'), "\"");
        case 'file':
            return js.toString();
        case 'keyword':
            return js.toString();
        case 'null':
            return 'nil';
        case 'regexp':
            return "#\"".concat(js.source, "\"");
        case 'object': {
            // simple vertical format
            var obj = Object.keys(js)
                .reduce(function (accumulator, key) {
                var val = padBlock(key.length + 2, jsToEdn(js[key]));
                return "".concat(accumulator, ":").concat(key, " ").concat(val, "\n ");
            }, '')
                .trim();
            return "{".concat(padBlock(1, obj), "}");
        }
        case 'array': {
            // simple horizontal format
            var arr = js
                .reduce(function (accumulator, value) { return "".concat(accumulator, " ").concat(jsToEdn(value)); }, '')
                .trim();
            return "[".concat(padBlock(1, arr), "]");
        }
        default: // 'number' 'boolean'
            return js.toString();
    }
};
exports.clj_http = {
    info: {
        key: 'clj_http',
        title: 'clj-http',
        link: 'https://github.com/dakrone/clj-http',
        description: 'An idiomatic clojure http client wrapping the apache client.'
    },
    convert: function (_a, options) {
        var queryObj = _a.queryObj, method = _a.method, postData = _a.postData, url = _a.url, allHeaders = _a.allHeaders;
        var _b = new code_builder_1.CodeBuilder({ indent: options === null || options === void 0 ? void 0 : options.indent }), push = _b.push, join = _b.join;
        var methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'];
        method = method.toLowerCase();
        if (!methods.includes(method)) {
            push('Method not supported');
            return join();
        }
        var params = {
            headers: allHeaders,
            'query-params': queryObj
        };
        switch (postData.mimeType) {
            case 'application/json':
                {
                    params['content-type'] = new Keyword('json');
                    params['form-params'] = postData.jsonObj;
                    var header = (0, headers_1.getHeaderName)(params.headers, 'content-type');
                    if (header) {
                        delete params.headers[header];
                    }
                }
                break;
            case 'application/x-www-form-urlencoded':
                {
                    params['form-params'] = postData.paramsObj;
                    var header = (0, headers_1.getHeaderName)(params.headers, 'content-type');
                    if (header) {
                        delete params.headers[header];
                    }
                }
                break;
            case 'text/plain':
                {
                    params.body = postData.text;
                    var header = (0, headers_1.getHeaderName)(params.headers, 'content-type');
                    if (header) {
                        delete params.headers[header];
                    }
                }
                break;
            case 'multipart/form-data': {
                if (postData.params) {
                    params.multipart = postData.params.map(function (param) {
                        if (param.fileName && !param.value) {
                            return {
                                name: param.name,
                                content: new File(param.fileName)
                            };
                        }
                        return {
                            name: param.name,
                            content: param.value
                        };
                    });
                    var header = (0, headers_1.getHeaderName)(params.headers, 'content-type');
                    if (header) {
                        delete params.headers[header];
                    }
                }
                break;
            }
        }
        switch ((0, headers_1.getHeader)(params.headers, 'accept')) {
            case 'application/json':
                {
                    params.accept = new Keyword('json');
                    var header = (0, headers_1.getHeaderName)(params.headers, 'accept');
                    if (header) {
                        delete params.headers[header];
                    }
                }
                break;
        }
        push("(require '[clj-http.client :as client])\n");
        if (objEmpty(filterEmpty(params))) {
            push("(client/".concat(method, " \"").concat(url, "\")"));
        }
        else {
            var padding = 11 + method.length + url.length;
            var formattedParams = padBlock(padding, jsToEdn(filterEmpty(params)));
            push("(client/".concat(method, " \"").concat(url, "\" ").concat(formattedParams, ")"));
        }
        return join();
    }
};
