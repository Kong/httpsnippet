"use strict";
/**
 * @description
 * HTTP code snippet generator for native Go.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
exports.__esModule = true;
exports.native = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
exports.native = {
    info: {
        key: 'native',
        title: 'NewRequest',
        link: 'http://golang.org/pkg/net/http/#NewRequest',
        description: 'Golang HTTP client request'
    },
    convert: function (_a, options) {
        var postData = _a.postData, method = _a.method, allHeaders = _a.allHeaders, fullUrl = _a.fullUrl;
        if (options === void 0) { options = {}; }
        var _b = new code_builder_1.CodeBuilder({ indent: '\t' }), blank = _b.blank, push = _b.push, join = _b.join;
        var _c = options.showBoilerplate, showBoilerplate = _c === void 0 ? true : _c, _d = options.checkErrors, checkErrors = _d === void 0 ? false : _d, _e = options.printBody, printBody = _e === void 0 ? true : _e, _f = options.timeout, timeout = _f === void 0 ? -1 : _f, _g = options.insecureSkipVerify, insecureSkipVerify = _g === void 0 ? false : _g;
        var errorPlaceholder = checkErrors ? 'err' : '_';
        var indent = showBoilerplate ? 1 : 0;
        var errorCheck = function () {
            if (checkErrors) {
                push('if err != nil {', indent);
                push('panic(err)', indent + 1);
                push('}', indent);
            }
        };
        // Create boilerplate
        if (showBoilerplate) {
            push('package main');
            blank();
            push('import (');
            push('"fmt"', indent);
            if (timeout > 0) {
                push('"time"', indent);
            }
            if (insecureSkipVerify) {
                push('"crypto/tls"', indent);
            }
            if (postData.text) {
                push('"strings"', indent);
            }
            push('"net/http"', indent);
            if (printBody) {
                push('"io"', indent);
            }
            push(')');
            blank();
            push('func main() {');
            blank();
        }
        // Create an insecure transport for the client
        if (insecureSkipVerify) {
            push('insecureTransport := http.DefaultTransport.(*http.Transport).Clone()', indent);
            push('insecureTransport.TLSClientConfig = &tls.Config{InsecureSkipVerify: true}', indent);
        }
        // Create client
        var hasTimeout = timeout > 0;
        var hasClient = hasTimeout || insecureSkipVerify;
        var client = hasClient ? 'client' : 'http.DefaultClient';
        if (hasClient) {
            push('client := http.Client{', indent);
            if (hasTimeout) {
                push("Timeout: time.Duration(".concat(timeout, " * time.Second),"), indent + 1);
            }
            if (insecureSkipVerify) {
                push('Transport: insecureTransport,', indent + 1);
            }
            push('}', indent);
            blank();
        }
        push("url := \"".concat(fullUrl, "\""), indent);
        blank();
        // If we have body content or not create the var and reader or nil
        if (postData.text) {
            push("payload := strings.NewReader(".concat(JSON.stringify(postData.text), ")"), indent);
            blank();
            push("req, ".concat(errorPlaceholder, " := http.NewRequest(\"").concat(method, "\", url, payload)"), indent);
            blank();
        }
        else {
            push("req, ".concat(errorPlaceholder, " := http.NewRequest(\"").concat(method, "\", url, nil)"), indent);
            blank();
        }
        errorCheck();
        // Add headers
        if (Object.keys(allHeaders).length) {
            Object.keys(allHeaders).forEach(function (key) {
                push("req.Header.Add(\"".concat(key, "\", \"").concat((0, escape_1.escapeForDoubleQuotes)(allHeaders[key]), "\")"), indent);
            });
            blank();
        }
        // Make request
        push("res, ".concat(errorPlaceholder, " := ").concat(client, ".Do(req)"), indent);
        errorCheck();
        // Get Body
        if (printBody) {
            blank();
            push('defer res.Body.Close()', indent);
            push("body, ".concat(errorPlaceholder, " := io.ReadAll(res.Body)"), indent);
            errorCheck();
        }
        // Print it
        blank();
        push('fmt.Println(res)', indent);
        if (printBody) {
            push('fmt.Println(string(body))', indent);
        }
        // End main block
        if (showBoilerplate) {
            blank();
            push('}');
        }
        return join();
    }
};
