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
exports.http2 = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var headers_1 = require("../../../helpers/headers");
var helpers_1 = require("../helpers");
exports.http2 = {
    info: {
        key: 'http2',
        title: 'HTTP v2',
        link: 'http://devel-m6w6.rhcloud.com/mdref/http',
        description: 'PHP with pecl/http v2'
    },
    convert: function (_a, options) {
        var _b;
        var postData = _a.postData, headersObj = _a.headersObj, method = _a.method, queryObj = _a.queryObj, cookiesObj = _a.cookiesObj, url = _a.url;
        if (options === void 0) { options = {}; }
        var _c = options.closingTag, closingTag = _c === void 0 ? false : _c, _d = options.indent, indent = _d === void 0 ? '  ' : _d, _e = options.noTags, noTags = _e === void 0 ? false : _e, _f = options.shortTags, shortTags = _f === void 0 ? false : _f;
        var _g = new code_builder_1.CodeBuilder({ indent: indent }), push = _g.push, blank = _g.blank, join = _g.join;
        var hasBody = false;
        if (!noTags) {
            push(shortTags ? '<?' : '<?php');
            blank();
        }
        push('$client = new http\\Client;');
        push('$request = new http\\Client\\Request;');
        blank();
        switch (postData.mimeType) {
            case 'application/x-www-form-urlencoded':
                push('$body = new http\\Message\\Body;');
                push("$body->append(new http\\QueryString(".concat((0, helpers_1.convertType)(postData.paramsObj, indent), "));"));
                blank();
                hasBody = true;
                break;
            case 'multipart/form-data': {
                if (!postData.params) {
                    break;
                }
                var files_1 = [];
                var fields_1 = {};
                postData.params.forEach(function (_a) {
                    var name = _a.name, fileName = _a.fileName, value = _a.value, contentType = _a.contentType;
                    if (fileName) {
                        files_1.push({
                            name: name,
                            type: contentType,
                            file: fileName,
                            data: value
                        });
                        return;
                    }
                    if (value) {
                        fields_1[name] = value;
                    }
                });
                var field = Object.keys(fields_1).length ? (0, helpers_1.convertType)(fields_1, indent) : 'null';
                var formValue = files_1.length ? (0, helpers_1.convertType)(files_1, indent) : 'null';
                push('$body = new http\\Message\\Body;');
                push("$body->addForm(".concat(field, ", ").concat(formValue, ");"));
                // remove the contentType header
                if ((0, headers_1.hasHeader)(headersObj, 'content-type')) {
                    if ((_b = (0, headers_1.getHeader)(headersObj, 'content-type')) === null || _b === void 0 ? void 0 : _b.indexOf('boundary')) {
                        var headerName = (0, headers_1.getHeaderName)(headersObj, 'content-type');
                        if (headerName) {
                            delete headersObj[headerName];
                        }
                    }
                }
                blank();
                hasBody = true;
                break;
            }
            case 'application/json':
                push('$body = new http\\Message\\Body;');
                push("$body->append(json_encode(".concat((0, helpers_1.convertType)(postData.jsonObj, indent), "));"));
                hasBody = true;
                break;
            default:
                if (postData.text) {
                    push('$body = new http\\Message\\Body;');
                    push("$body->append(".concat((0, helpers_1.convertType)(postData.text), ");"));
                    blank();
                    hasBody = true;
                }
        }
        push("$request->setRequestUrl(".concat((0, helpers_1.convertType)(url), ");"));
        push("$request->setRequestMethod(".concat((0, helpers_1.convertType)(method), ");"));
        if (hasBody) {
            push('$request->setBody($body);');
            blank();
        }
        if (Object.keys(queryObj).length) {
            push("$request->setQuery(new http\\QueryString(".concat((0, helpers_1.convertType)(queryObj, indent), "));"));
            blank();
        }
        if (Object.keys(headersObj).length) {
            push("$request->setHeaders(".concat((0, helpers_1.convertType)(headersObj, indent), ");"));
            blank();
        }
        if (Object.keys(cookiesObj).length) {
            blank();
            push("$client->setCookies(".concat((0, helpers_1.convertType)(cookiesObj, indent), ");"));
            blank();
        }
        push('$client->enqueue($request)->send();');
        push('$response = $client->getResponse();');
        blank();
        push('echo $response->getBody();');
        if (!noTags && closingTag) {
            blank();
            push('?>');
        }
        return join();
    }
};
