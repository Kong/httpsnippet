"use strict";
/**
 * @description
 * HTTP code snippet generator for Swift using NSURLSession.
 *
 * @author
 * @thibaultCha
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.nsurlsession = void 0;
var code_builder_1 = require("../../../helpers/code-builder");
var helpers_1 = require("../helpers");
exports.nsurlsession = {
    info: {
        key: 'nsurlsession',
        title: 'NSURLSession',
        link: 'https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html',
        description: "Foundation's NSURLSession request"
    },
    convert: function (_a, options) {
        var _b;
        var allHeaders = _a.allHeaders, postData = _a.postData, fullUrl = _a.fullUrl, method = _a.method;
        var opts = __assign({ indent: '  ', pretty: true, timeout: '10' }, options);
        var _c = new code_builder_1.CodeBuilder({ indent: opts.indent }), push = _c.push, blank = _c.blank, join = _c.join;
        // Markers for headers to be created as litteral objects and later be set on the NSURLRequest if exist
        var req = {
            hasHeaders: false,
            hasBody: false
        };
        // We just want to make sure people understand that is the only dependency
        push('import Foundation');
        if (Object.keys(allHeaders).length) {
            req.hasHeaders = true;
            blank();
            push((0, helpers_1.literalDeclaration)('headers', allHeaders, opts));
        }
        if (postData.text || postData.jsonObj || postData.params) {
            req.hasBody = true;
            switch (postData.mimeType) {
                case 'application/x-www-form-urlencoded':
                    // By appending parameters one by one in the resulting snippet,
                    // we make it easier for the user to edit it according to his or her needs after pasting.
                    // The user can just add/remove lines adding/removing body parameters.
                    blank();
                    if ((_b = postData.params) === null || _b === void 0 ? void 0 : _b.length) {
                        var _d = __read(postData.params), head = _d[0], tail = _d.slice(1);
                        push("let postData = NSMutableData(data: \"".concat(head.name, "=").concat(head.value, "\".data(using: String.Encoding.utf8)!)"));
                        tail.forEach(function (_a) {
                            var name = _a.name, value = _a.value;
                            push("postData.append(\"&".concat(name, "=").concat(value, "\".data(using: String.Encoding.utf8)!)"));
                        });
                    }
                    else {
                        req.hasBody = false;
                    }
                    break;
                case 'application/json':
                    if (postData.jsonObj) {
                        push("".concat((0, helpers_1.literalDeclaration)('parameters', postData.jsonObj, opts), " as [String : Any]"));
                        blank();
                        push('let postData = JSONSerialization.data(withJSONObject: parameters, options: [])');
                    }
                    break;
                case 'multipart/form-data':
                    /**
                     * By appending multipart parameters one by one in the resulting snippet,
                     * we make it easier for the user to edit it according to his or her needs after pasting.
                     * The user can just edit the parameters NSDictionary or put this part of a snippet in a multipart builder method.
                     */
                    push((0, helpers_1.literalDeclaration)('parameters', postData.params, opts));
                    blank();
                    push("let boundary = \"".concat(postData.boundary, "\""));
                    blank();
                    push('var body = ""');
                    push('var error: NSError? = nil');
                    push('for param in parameters {');
                    push('let paramName = param["name"]!', 1);
                    push('body += "--\\(boundary)\\r\\n"', 1);
                    push('body += "Content-Disposition:form-data; name=\\"\\(paramName)\\""', 1);
                    push('if let filename = param["fileName"] {', 1);
                    push('let contentType = param["content-type"]!', 2);
                    push('let fileContent = String(contentsOfFile: filename, encoding: String.Encoding.utf8)', 2);
                    push('if (error != nil) {', 2);
                    push('print(error as Any)', 3);
                    push('}', 2);
                    push('body += "; filename=\\"\\(filename)\\"\\r\\n"', 2);
                    push('body += "Content-Type: \\(contentType)\\r\\n\\r\\n"', 2);
                    push('body += fileContent', 2);
                    push('} else if let paramValue = param["value"] {', 1);
                    push('body += "\\r\\n\\r\\n\\(paramValue)"', 2);
                    push('}', 1);
                    push('}');
                    break;
                default:
                    blank();
                    push("let postData = NSData(data: \"".concat(postData.text, "\".data(using: String.Encoding.utf8)!)"));
            }
        }
        blank();
        // NSURLRequestUseProtocolCachePolicy is the default policy, let's just always set it to avoid confusion.
        push("let request = NSMutableURLRequest(url: NSURL(string: \"".concat(fullUrl, "\")! as URL,"));
        push('                                        cachePolicy: .useProtocolCachePolicy,');
        push(
        // @ts-expect-error needs better types
        "                                    timeoutInterval: ".concat(parseInt(opts.timeout, 10).toFixed(1), ")"));
        push("request.httpMethod = \"".concat(method, "\""));
        if (req.hasHeaders) {
            push('request.allHTTPHeaderFields = headers');
        }
        if (req.hasBody) {
            push('request.httpBody = postData as Data');
        }
        blank();
        // Retrieving the shared session will be less verbose than creating a new one.
        push('let session = URLSession.shared');
        push('let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in');
        push('if (error != nil) {', 1);
        push('print(error as Any)', 2);
        push('} else {', 1); // Casting the NSURLResponse to NSHTTPURLResponse so the user can see the status     .
        push('let httpResponse = response as? HTTPURLResponse', 2);
        push('print(httpResponse)', 2);
        push('}', 1);
        push('})');
        blank();
        push('dataTask.resume()');
        return join();
    }
};
