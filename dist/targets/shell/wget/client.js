"use strict";
/**
 * @description
 * HTTP code snippet generator for the Shell using Wget.
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
exports.wget = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var shell_1 = require("../../../helpers/shell");
exports.wget = {
    info: {
        key: 'wget',
        title: 'Wget',
        link: 'https://www.gnu.org/software/wget/',
        description: 'a free software package for retrieving files using HTTP, HTTPS'
    },
    convert: function (_a, options) {
        var method = _a.method, postData = _a.postData, allHeaders = _a.allHeaders, fullUrl = _a.fullUrl;
        var opts = __assign({ indent: '  ', short: false, verbose: false }, options);
        var _b = new code_builder_1.CodeBuilder({
            indent: opts.indent,
            // @ts-expect-error SEEMS LEGIT
            join: opts.indent !== false ? " \\\n".concat(opts.indent) : ' '
        }), push = _b.push, join = _b.join;
        if (opts.verbose) {
            push("wget ".concat(opts.short ? '-v' : '--verbose'));
        }
        else {
            push("wget ".concat(opts.short ? '-q' : '--quiet'));
        }
        push("--method ".concat((0, shell_1.quote)(method)));
        Object.keys(allHeaders).forEach(function (key) {
            var header = "".concat(key, ": ").concat(allHeaders[key]);
            push("--header ".concat((0, shell_1.quote)(header)));
        });
        if (postData.text) {
            push("--body-data ".concat((0, shell_1.escape)((0, shell_1.quote)(postData.text))));
        }
        push(opts.short ? '-O' : '--output-document');
        push("- ".concat((0, shell_1.quote)(fullUrl)));
        return join();
    }
};
