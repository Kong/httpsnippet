"use strict";
/**
 * @description
 * HTTP code snippet generator for Objective-C using NSURLSession.
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
        var allHeaders = _a.allHeaders, postData = _a.postData, method = _a.method, fullUrl = _a.fullUrl;
        var opts = __assign({ indent: '    ', pretty: true, timeout: 10 }, options);
        var _c = new code_builder_1.CodeBuilder({ indent: opts.indent }), push = _c.push, join = _c.join, blank = _c.blank;
        // Markers for headers to be created as literal objects and later be set on the NSURLRequest if exist
        var req = {
            hasHeaders: false,
            hasBody: false
        };
        // We just want to make sure people understand that is the only dependency
        push('#import <Foundation/Foundation.h>');
        if (Object.keys(allHeaders).length) {
            req.hasHeaders = true;
            blank();
            push((0, helpers_1.nsDeclaration)('NSDictionary', 'headers', allHeaders, opts.pretty));
        }
        if (postData.text || postData.jsonObj || postData.params) {
            req.hasBody = true;
            switch (postData.mimeType) {
                case 'application/x-www-form-urlencoded':
                    if ((_b = postData.params) === null || _b === void 0 ? void 0 : _b.length) {
                        // By appending parameters one by one in the resulting snippet,
                        // we make it easier for the user to edit it according to his or her needs after pasting.
                        // The user can just add/remove lines adding/removing body parameters.
                        blank();
                        var _d = __read(postData.params), head = _d[0], tail = _d.slice(1);
                        push("NSMutableData *postData = [[NSMutableData alloc] initWithData:[@\"".concat(head.name, "=").concat(head.value, "\" dataUsingEncoding:NSUTF8StringEncoding]];"));
                        tail.forEach(function (_a) {
                            var name = _a.name, value = _a.value;
                            push("[postData appendData:[@\"&".concat(name, "=").concat(value, "\" dataUsingEncoding:NSUTF8StringEncoding]];"));
                        });
                    }
                    else {
                        req.hasBody = false;
                    }
                    break;
                case 'application/json':
                    if (postData.jsonObj) {
                        push((0, helpers_1.nsDeclaration)('NSDictionary', 'parameters', postData.jsonObj, opts.pretty));
                        blank();
                        push('NSData *postData = [NSJSONSerialization dataWithJSONObject:parameters options:0 error:nil];');
                    }
                    break;
                case 'multipart/form-data':
                    // By appending multipart parameters one by one in the resulting snippet,
                    // we make it easier for the user to edit it according to his or her needs after pasting.
                    // The user can just edit the parameters NSDictionary or put this part of a snippet in a multipart builder method.
                    push((0, helpers_1.nsDeclaration)('NSArray', 'parameters', postData.params || [], opts.pretty));
                    push("NSString *boundary = @\"".concat(postData.boundary, "\";"));
                    blank();
                    push('NSError *error;');
                    push('NSMutableString *body = [NSMutableString string];');
                    push('for (NSDictionary *param in parameters) {');
                    push('[body appendFormat:@"--%@\\r\\n", boundary];', 1);
                    push('if (param[@"fileName"]) {', 1);
                    push('[body appendFormat:@"Content-Disposition:form-data; name=\\"%@\\"; filename=\\"%@\\"\\r\\n", param[@"name"], param[@"fileName"]];', 2);
                    push('[body appendFormat:@"Content-Type: %@\\r\\n\\r\\n", param[@"contentType"]];', 2);
                    push('[body appendFormat:@"%@", [NSString stringWithContentsOfFile:param[@"fileName"] encoding:NSUTF8StringEncoding error:&error]];', 2);
                    push('if (error) {', 2);
                    push('NSLog(@"%@", error);', 3);
                    push('}', 2);
                    push('} else {', 1);
                    push('[body appendFormat:@"Content-Disposition:form-data; name=\\"%@\\"\\r\\n\\r\\n", param[@"name"]];', 2);
                    push('[body appendFormat:@"%@", param[@"value"]];', 2);
                    push('}', 1);
                    push('}');
                    push('[body appendFormat:@"\\r\\n--%@--\\r\\n", boundary];');
                    push('NSData *postData = [body dataUsingEncoding:NSUTF8StringEncoding];');
                    break;
                default:
                    blank();
                    push("NSData *postData = [[NSData alloc] initWithData:[@\"".concat(postData.text, "\" dataUsingEncoding:NSUTF8StringEncoding]];"));
            }
        }
        blank();
        push("NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@\"".concat(fullUrl, "\"]"));
        // NSURLRequestUseProtocolCachePolicy is the default policy, let's just always set it to avoid confusion.
        push('                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy');
        push("                                                   timeoutInterval:".concat(opts.timeout.toFixed(1), "];"));
        push("[request setHTTPMethod:@\"".concat(method, "\"];"));
        if (req.hasHeaders) {
            push('[request setAllHTTPHeaderFields:headers];');
        }
        if (req.hasBody) {
            push('[request setHTTPBody:postData];');
        }
        blank();
        // Retrieving the shared session will be less verbose than creating a new one.
        push('NSURLSession *session = [NSURLSession sharedSession];');
        push('NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request');
        push('                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {');
        push('                                            if (error) {', 1);
        push('                                            NSLog(@"%@", error);', 2);
        push('                                            } else {', 1);
        // Casting the NSURLResponse to NSHTTPURLResponse so the user can see the status     .
        push('                                            NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;', 2);
        push('                                            NSLog(@"%@", httpResponse);', 2);
        push('                                            }', 1);
        push('                                            }];');
        push('[dataTask resume];');
        return join();
    }
};
