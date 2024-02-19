"use strict";
/**
 * @description
 * HTTP code snippet generator for OCaml using CoHTTP.
 *
 * @author
 * @SGrondin
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
exports.cohttp = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var escape_1 = require("../../../helpers/escape");
exports.cohttp = {
    info: {
        key: 'cohttp',
        title: 'CoHTTP',
        link: 'https://github.com/mirage/ocaml-cohttp',
        description: 'Cohttp is a very lightweight HTTP server using Lwt or Async for OCaml'
    },
    convert: function (_a, options) {
        var fullUrl = _a.fullUrl, allHeaders = _a.allHeaders, postData = _a.postData, method = _a.method;
        var opts = __assign({ indent: '  ' }, options);
        var methods = ['get', 'post', 'head', 'delete', 'patch', 'put', 'options'];
        var _b = new code_builder_1.CodeBuilder({ indent: opts.indent }), push = _b.push, blank = _b.blank, join = _b.join;
        push('open Cohttp_lwt_unix');
        push('open Cohttp');
        push('open Lwt');
        blank();
        push("let uri = Uri.of_string \"".concat(fullUrl, "\" in"));
        // Add headers, including the cookies
        var headers = Object.keys(allHeaders);
        if (headers.length === 1) {
            push("let headers = Header.add (Header.init ()) \"".concat(headers[0], "\" \"").concat((0, escape_1.escapeForDoubleQuotes)(allHeaders[headers[0]]), "\" in"));
        }
        else if (headers.length > 1) {
            push('let headers = Header.add_list (Header.init ()) [');
            headers.forEach(function (key) {
                push("(\"".concat(key, "\", \"").concat((0, escape_1.escapeForDoubleQuotes)(allHeaders[key]), "\");"), 1);
            });
            push('] in');
        }
        // Add body
        if (postData.text) {
            // Just text
            push("let body = Cohttp_lwt_body.of_string ".concat(JSON.stringify(postData.text), " in"));
        }
        // Do the request
        blank();
        var h = headers.length ? '~headers ' : '';
        var b = postData.text ? '~body ' : '';
        var m = methods.includes(method.toLowerCase())
            ? "`".concat(method.toUpperCase())
            : "(Code.method_of_string \"".concat(method, "\")");
        push("Client.call ".concat(h).concat(b).concat(m, " uri"));
        // Catch result
        push('>>= fun (res, body_stream) ->');
        push('(* Do stuff with the result *)', 1);
        return join();
    }
};
