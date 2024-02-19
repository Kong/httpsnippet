"use strict";
/**
 * @description
 * HTTP code snippet generator to generate raw HTTP/1.1 request strings,
 * in accordance to the RFC 7230 (and RFC 7231) specifications.
 *
 * @author
 * @irvinlim
 *
 * For any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
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
exports.http11 = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var CRLF = '\r\n';
/**
 * Request follows the request message format in accordance to RFC 7230, Section 3.
 * Each section is prepended with the RFC and section number.
 * See more at https://tools.ietf.org/html/rfc7230#section-3.
 */
exports.http11 = {
    info: {
        key: 'http1.1',
        title: 'HTTP/1.1',
        link: 'https://tools.ietf.org/html/rfc7230',
        description: 'HTTP/1.1 request string in accordance with RFC 7230'
    },
    convert: function (_a, options) {
        var method = _a.method, fullUrl = _a.fullUrl, uriObj = _a.uriObj, httpVersion = _a.httpVersion, allHeaders = _a.allHeaders, postData = _a.postData;
        var opts = __assign({ absoluteURI: false, autoContentLength: true, autoHost: true }, options);
        // RFC 7230 Section 3. Message Format
        // All lines have no indentation, and should be terminated with CRLF.
        var _b = new code_builder_1.CodeBuilder({ indent: '', join: CRLF }), blank = _b.blank, push = _b.push, join = _b.join;
        // RFC 7230 Section 5.3. Request Target
        // Determines if the Request-Line should use 'absolute-form' or 'origin-form'.
        // Basically it means whether the "http://domain.com" will prepend the full url.
        var requestUrl = opts.absoluteURI ? fullUrl : uriObj.path;
        // RFC 7230 Section 3.1.1. Request-Line
        push("".concat(method, " ").concat(requestUrl, " ").concat(httpVersion));
        var headerKeys = Object.keys(allHeaders);
        // RFC 7231 Section 5. Header Fields
        headerKeys.forEach(function (key) {
            // Capitalize header keys, even though it's not required by the spec.
            var keyCapitalized = key.toLowerCase().replace(/(^|-)(\w)/g, function (input) { return input.toUpperCase(); });
            push("".concat(keyCapitalized, ": ").concat(allHeaders[key]));
        });
        // RFC 7230 Section 5.4. Host
        // Automatically set Host header if option is on and on header already exists.
        if (opts.autoHost && !headerKeys.includes('host')) {
            push("Host: ".concat(uriObj.host));
        }
        // RFC 7230 Section 3.3.3. Message Body Length
        // Automatically set Content-Length header if option is on, postData is present and no header already exists.
        if (opts.autoContentLength && postData.text && !headerKeys.includes('content-length')) {
            var length = Buffer.byteLength(postData.text, 'ascii').toString();
            push("Content-Length: ".concat(length));
        }
        // Add extra line after header section.
        blank();
        // Separate header section and message body section.
        var headerSection = join();
        // RFC 7230 Section 3.3. Message Body
        var messageBody = postData.text || '';
        // RFC 7230 Section 3. Message Format
        // Extra CRLF separating the headers from the body.
        return "".concat(headerSection).concat(CRLF).concat(messageBody);
    }
};
