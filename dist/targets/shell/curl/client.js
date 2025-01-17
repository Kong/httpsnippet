"use strict";
/**
 * @description
 *
 * HTTP code snippet generator for the Shell using cURL.
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
exports.curl = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var headers_1 = require("../../../helpers/headers");
var shell_1 = require("../../../helpers/shell");
/**
 * This is a const record with keys that correspond to the long names and values that correspond to the short names for cURL arguments.
 */
var params = {
    'http1.0': '0',
    'url ': '',
    cookie: 'b',
    data: 'd',
    form: 'F',
    globoff: 'g',
    header: 'H',
    insecure: 'k',
    request: 'X'
};
var getArg = function (short) { return function (longName) {
    // console.log(longName);
    if (short) {
        var shortName = params[longName];
        if (!shortName) {
            return '';
        }
        return "-".concat(shortName);
    }
    return "--".concat(longName);
}; };
var encodeData = function(k, v, binary, push) {
    var encodedName = encodeURIComponent(k);
    var encodedValue = encodeURIComponent(v);
    var needsEncoding = encodedValue !== v;
    var nameNeedsQuotes = encodedName !== k;
    var name = nameNeedsQuotes ? `"${k}"` : k;
    var value = needsEncoding ? `"${v}"` : v;
    var flag = binary ? '--data-binary' : needsEncoding ? '--data-urlencode' : '-d';
    // console.log(flag);
    push("".concat(flag, " ").concat(("".concat(name, "=").concat(value))));
};
exports.curl = {
    info: {
        key: 'curl',
        title: 'cURL',
        link: 'http://curl.haxx.se/',
        description: 'cURL is a command line tool and library for transferring data with URL syntax'
    },
    convert: function (_a, options) {
        var _b;
        var fullUrl = _a.fullUrl, method = _a.method, httpVersion = _a.httpVersion, headersObj = _a.headersObj, allHeaders = _a.allHeaders, postData = _a.postData, uriObj = _a.uriObj, queryObj = _a.queryObj;
        // console.log(uriObj);
        // console.log(queryObj);
        // console.log(fullUrl);
        // console.log(postData);
        if (options === void 0) { options = {}; }
        var _c = options.binary, binary = _c === void 0 ? false : _c, _d = options.globOff, globOff = _d === void 0 ? false : _d, _e = options.indent, indent = _e === void 0 ? '  ' : _e, _f = options.insecureSkipVerify, insecureSkipVerify = _f === void 0 ? false : _f, _g = options.prettifyJson, prettifyJson = _g === void 0 ? false : _g, _h = options.short, short = _h === void 0 ? false : _h;
        // console.log(short);
        var _j = new code_builder_1.CodeBuilder(__assign(__assign({}, (typeof indent === 'string' ? { indent: indent } : {})), { join: indent !== false ? " \\\n".concat(indent) : ' ' })), push = _j.push, join = _j.join;
        var arg = getArg(short);
        // console.log(JSON.stringify(arg, null, 4));
        var formattedUrl = (0, shell_1.quote)(fullUrl);
        // console.log(formattedUrl);
        // console.log(method);
        // push("curl ".concat(arg('request'), " ").concat(method));
        if (method === 'GET' && formattedUrl[0] === "'" && uriObj.search.length > 0) {
            fullUrl = uriObj.href;
            push(`curl -G ${fullUrl}`);
        } else {
            push(`curl ${formattedUrl}`);
        }
        if (globOff) {
            formattedUrl = unescape(formattedUrl);
            push(arg('globoff'));
        }
        // push("".concat(arg('url ')).concat(formattedUrl));
        if (insecureSkipVerify) {
            push(arg('insecure'));
        }
        if (httpVersion === 'HTTP/1.0') {
            push(arg('http1.0'));
        }
        if ((0, headers_1.getHeader)(allHeaders, 'accept-encoding')) {
            // note: there is no shorthand for this cURL option
            push('--compressed');
        }
        // if multipart form data, we want to remove the boundary
        if (postData.mimeType === 'multipart/form-data') {
            var contentTypeHeaderName = (0, headers_1.getHeaderName)(headersObj, 'content-type');
            if (contentTypeHeaderName) {
                var contentTypeHeader = headersObj[contentTypeHeaderName];
                if (contentTypeHeaderName && contentTypeHeader) {
                    // remove the leading semi colon and boundary
                    // up to the next semi colon or the end of string
                    // @ts-expect-error it is a reality that the headersObj can have values which are string arrays.  This is a genuine bug that this case isn't handled or tested.  It is, however tested in `reducer.test.ts`.  Go check that out to see more.
                    var noBoundary = contentTypeHeader.replace(/; boundary.+?(?=(;|$))/, '');
                    // replace the content-type header with no boundary in both headersObj and allHeaders
                    headersObj[contentTypeHeaderName] = noBoundary;
                    allHeaders[contentTypeHeaderName] = noBoundary;
                }
            }
        }
        // construct headers
        Object.keys(headersObj)
            .sort()
            .forEach(function (key) {
            // console.log(key);
            if (key === "content-type") { return; }
            if (key === "Authorization") {
              // console.log(headersObj[key]);
              // console.log(`-u "${headersObj[key]}:"`);
              push(`-u "a32f39fjas9dfan:"`);
            } else {
              var header = "".concat(key, ": ").concat(headersObj[key]);
              push("".concat(arg('header'), " ").concat((0, shell_1.quote)(header)));
            }
        });
        if (allHeaders.cookie) {
            push("".concat(arg('cookie'), " ").concat((0, shell_1.quote)(allHeaders.cookie)));
        }
        if (method === 'GET' && formattedUrl[0] === "'" && uriObj.search.length > 0) {
            Object.entries(queryObj).forEach(function ([k, v]) {
                encodeData(k, v, binary, push);
            });
        }
        // console.log(postData);
        // construct post params
        switch (postData.mimeType) {
            case 'multipart/form-data':
                (_b = postData.params) === null || _b === void 0 ? void 0 : _b.forEach(function (param) {
                    var post = '';
                    if (param.fileName) {
                        post = "".concat(param.name, "=@").concat(param.fileName);
                    }
                    else {
                        post = "".concat(param.name, "=").concat(param.value);
                    }
                    push("".concat(arg('form'), " ").concat((0, shell_1.quote)(post)));
                });
                break;
            case 'application/x-www-form-urlencoded':
                if (postData.params) {
                    postData.params.forEach(function (param) {
                        encodeData(param.name, param.value, binary, push);
                    });
                }
                else {
                    push("".concat(binary ? '--data-binary' : arg('data'), " ").concat((0, shell_1.quote)(postData.text)));
                }

                if (method === 'PUT') {
                    push("".concat("-X", " PUT"));
                }
                break;
            default: {
                // raw request body
                if (!postData.text) {
                    if (['POST', 'PUT'].includes(method)) {
                    push("".concat("-X", ` ${method}`));
                    }
                    break;
                }
                var flag = binary ? '--data-binary' : arg('data');
                var builtPayload = false;
                // If we're dealing with a JSON variant, and our payload is JSON let's make it look a little nicer.
                if ((0, headers_1.isMimeTypeJSON)(postData.mimeType)) {
                    // If our postData is less than 20 characters, let's keep it all on one line so as to not make the snippet overly lengthy.
                    var couldBeJSON = postData.text.length > 2;
                    if (couldBeJSON && prettifyJson) {
                        try {
                            var jsonPayload = JSON.parse(postData.text);
                            // If the JSON object has a single quote we should prepare it inside of a HEREDOC because the single quote in something like `string's` can't be escaped when used with `--data`.
                            //
                            // Basically this boils down to `--data @- <<EOF...EOF` vs `--data '...'`.
                            builtPayload = true;
                            var payload = JSON.stringify(jsonPayload, undefined, indent);
                            if (postData.text.indexOf("'") > 0) {
                                push("".concat(flag, " @- <<EOF\n").concat(payload, "\nEOF"));
                            }
                            else {
                                push("".concat(flag, " '\n").concat(payload, "\n'"));
                            }
                        }
                        catch (err) {
                            // no-op
                        }
                    }
                }
                if (!builtPayload) {
                    push("".concat(flag, " ").concat((0, shell_1.quote)(postData.text)));
                }
            }
        }
        return join();
    }
};
