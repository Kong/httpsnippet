"use strict";
exports.__esModule = true;
exports.generatePowershellConvert = void 0;
var code_builder_1 = require("../../helpers/code-builder");
var escape_1 = require("../../helpers/escape");
var headers_1 = require("../../helpers/headers");
var generatePowershellConvert = function (command) {
    var convert = function (_a) {
        var method = _a.method, headersObj = _a.headersObj, cookies = _a.cookies, uriObj = _a.uriObj, fullUrl = _a.fullUrl, postData = _a.postData, allHeaders = _a.allHeaders;
        var _b = new code_builder_1.CodeBuilder(), push = _b.push, join = _b.join;
        var methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
        if (!methods.includes(method.toUpperCase())) {
            return 'Method not supported';
        }
        var commandOptions = [];
        // Add headers, including the cookies
        var headers = Object.keys(headersObj);
        // construct headers
        if (headers.length) {
            push('$headers=@{}');
            headers.forEach(function (key) {
                if (key !== 'connection') {
                    // Not allowed
                    push("$headers.Add(\"".concat(key, "\", \"").concat((0, escape_1.escapeString)(headersObj[key], { escapeChar: '`' }), "\")"));
                }
            });
            commandOptions.push('-Headers $headers');
        }
        // construct cookies
        if (cookies.length) {
            push('$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession');
            cookies.forEach(function (cookie) {
                push('$cookie = New-Object System.Net.Cookie');
                push("$cookie.Name = '".concat(cookie.name, "'"));
                push("$cookie.Value = '".concat(cookie.value, "'"));
                push("$cookie.Domain = '".concat(uriObj.host, "'"));
                push('$session.Cookies.Add($cookie)');
            });
            commandOptions.push('-WebSession $session');
        }
        if (postData.text) {
            commandOptions.push("-ContentType '".concat((0, escape_1.escapeString)((0, headers_1.getHeader)(allHeaders, 'content-type'), { delimiter: "'", escapeChar: '`' }), "'"));
            commandOptions.push("-Body '".concat(postData.text, "'"));
        }
        push("$response = ".concat(command, " -Uri '").concat(fullUrl, "' -Method ").concat(method, " ").concat(commandOptions.join(' ')));
        return join();
    };
    return convert;
};
exports.generatePowershellConvert = generatePowershellConvert;
