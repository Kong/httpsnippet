"use strict";
/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
exports.__esModule = true;
exports.http1 = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var helpers_1 = require("../helpers");
exports.http1 = {
    info: {
        key: 'http1',
        title: 'HTTP v1',
        link: 'http://php.net/manual/en/book.http.php',
        description: 'PHP with pecl/http v1'
    },
    convert: function (_a, options) {
        var method = _a.method, url = _a.url, postData = _a.postData, queryObj = _a.queryObj, headersObj = _a.headersObj, cookiesObj = _a.cookiesObj;
        if (options === void 0) { options = {}; }
        var _b = options.closingTag, closingTag = _b === void 0 ? false : _b, _c = options.indent, indent = _c === void 0 ? '  ' : _c, _d = options.noTags, noTags = _d === void 0 ? false : _d, _e = options.shortTags, shortTags = _e === void 0 ? false : _e;
        var _f = new code_builder_1.CodeBuilder({ indent: indent }), push = _f.push, blank = _f.blank, join = _f.join;
        if (!noTags) {
            push(shortTags ? '<?' : '<?php');
            blank();
        }
        if (!helpers_1.supportedMethods.includes(method.toUpperCase())) {
            push("HttpRequest::methodRegister('".concat(method, "');"));
        }
        push('$request = new HttpRequest();');
        push("$request->setUrl(".concat((0, helpers_1.convertType)(url), ");"));
        if (helpers_1.supportedMethods.includes(method.toUpperCase())) {
            push("$request->setMethod(HTTP_METH_".concat(method.toUpperCase(), ");"));
        }
        else {
            push("$request->setMethod(HttpRequest::HTTP_METH_".concat(method.toUpperCase(), ");"));
        }
        blank();
        if (Object.keys(queryObj).length) {
            push("$request->setQueryData(".concat((0, helpers_1.convertType)(queryObj, indent), ");"));
            blank();
        }
        if (Object.keys(headersObj).length) {
            push("$request->setHeaders(".concat((0, helpers_1.convertType)(headersObj, indent), ");"));
            blank();
        }
        if (Object.keys(cookiesObj).length) {
            push("$request->setCookies(".concat((0, helpers_1.convertType)(cookiesObj, indent), ");"));
            blank();
        }
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                push("$request->setContentType(".concat((0, helpers_1.convertType)(postData.mimeType), ");"));
                push("$request->setPostFields(".concat((0, helpers_1.convertType)(postData.paramsObj, indent), ");"));
                blank();
                break;
            case 'application/json':
                push("$request->setContentType(".concat((0, helpers_1.convertType)(postData.mimeType), ");"));
                push("$request->setBody(json_encode(".concat((0, helpers_1.convertType)(postData.jsonObj, indent), "));"));
                blank();
                break;
            default:
                if (postData.text) {
                    push("$request->setBody(".concat((0, helpers_1.convertType)(postData.text), ");"));
                    blank();
                }
        }
        push('try {');
        push('$response = $request->send();', 1);
        blank();
        push('echo $response->getBody();', 1);
        push('} catch (HttpException $ex) {');
        push('echo $ex;', 1);
        push('}');
        if (!noTags && closingTag) {
            blank();
            push('?>');
        }
        return join();
    }
};
