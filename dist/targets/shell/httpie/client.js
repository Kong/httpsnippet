"use strict";
/**
 * @description
 * HTTP code snippet generator for the Shell using HTTPie.
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
exports.__esModule = true;
exports.httpie = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var shell_1 = require("../../../helpers/shell");
exports.httpie = {
    info: {
        key: 'httpie',
        title: 'HTTPie',
        link: 'http://httpie.org/',
        description: 'a CLI, cURL-like tool for humans'
    },
    convert: function (_a, options) {
        var allHeaders = _a.allHeaders, postData = _a.postData, queryObj = _a.queryObj, fullUrl = _a.fullUrl, method = _a.method, url = _a.url;
        var opts = __assign({ body: false, cert: false, headers: false, indent: '  ', pretty: false, print: false, queryParams: false, short: false, style: false, timeout: false, verbose: false, verify: false }, options);
        var _b = new code_builder_1.CodeBuilder({
            indent: opts.indent,
            // @ts-expect-error SEEMS LEGIT
            join: opts.indent !== false ? " \\\n".concat(opts.indent) : ' '
        }), push = _b.push, join = _b.join, unshift = _b.unshift;
        var raw = false;
        var flags = [];
        if (opts.headers) {
            flags.push(opts.short ? '-h' : '--headers');
        }
        if (opts.body) {
            flags.push(opts.short ? '-b' : '--body');
        }
        if (opts.verbose) {
            flags.push(opts.short ? '-v' : '--verbose');
        }
        if (opts.print) {
            flags.push("".concat(opts.short ? '-p' : '--print', "=").concat(opts.print));
        }
        if (opts.verify) {
            flags.push("--verify=".concat(opts.verify));
        }
        if (opts.cert) {
            flags.push("--cert=".concat(opts.cert));
        }
        if (opts.pretty) {
            flags.push("--pretty=".concat(opts.pretty));
        }
        if (opts.style) {
            flags.push("--style=".concat(opts.style));
        }
        if (opts.timeout) {
            flags.push("--timeout=".concat(opts.timeout));
        }
        // construct query params
        if (opts.queryParams) {
            Object.keys(queryObj).forEach(function (name) {
                var value = queryObj[name];
                if (Array.isArray(value)) {
                    value.forEach(function (val) {
                        push("".concat(name, "==").concat((0, shell_1.quote)(val)));
                    });
                }
                else {
                    push("".concat(name, "==").concat((0, shell_1.quote)(value)));
                }
            });
        }
        // construct headers
        Object.keys(allHeaders)
            .sort()
            .forEach(function (key) {
            push("".concat(key, ":").concat((0, shell_1.quote)(allHeaders[key])));
        });
        if (postData.mimeType === 'application/x-www-form-urlencoded') {
            // construct post params
            if (postData.params && postData.params.length) {
                flags.push(opts.short ? '-f' : '--form');
                postData.params.forEach(function (param) {
                    push("".concat(param.name, "=").concat((0, shell_1.quote)(param.value)));
                });
            }
        }
        else {
            raw = true;
        }
        var cliFlags = flags.length ? "".concat(flags.join(' '), " ") : '';
        url = (0, shell_1.quote)(opts.queryParams ? url : fullUrl);
        unshift("http ".concat(cliFlags).concat(method, " ").concat(url));
        if (raw && postData.text) {
            var postDataText = (0, shell_1.quote)(postData.text);
            unshift("echo ".concat(postDataText, " | "));
        }
        return join();
    }
};
