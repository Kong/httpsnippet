"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.HTTPSnippet = exports.addTargetClient = exports.addTarget = exports.extname = exports.availableTargets = void 0;
var event_stream_1 = require("event-stream");
var form_data_1 = __importDefault(require("form-data"));
var querystring_1 = require("querystring");
var url_1 = require("url");
var form_data_2 = require("./helpers/form-data");
var har_validator_1 = require("./helpers/har-validator");
var headers_1 = require("./helpers/headers");
var reducer_1 = require("./helpers/reducer");
var targets_1 = require("./targets/targets");
var utils_1 = require("./helpers/utils");
__createBinding(exports, utils_1, "availableTargets");
__createBinding(exports, utils_1, "extname");
var targets_2 = require("./targets/targets");
__createBinding(exports, targets_2, "addTarget");
__createBinding(exports, targets_2, "addTargetClient");
var DEBUG_MODE = false;
var debug = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- intentional noop
    info: DEBUG_MODE ? console.info : function () { }
};
var isHarEntry = function (value) {
    return typeof value === 'object' &&
        'log' in value &&
        typeof value.log === 'object' &&
        'entries' in value.log &&
        Array.isArray(value.log.entries);
};
var HTTPSnippet = /** @class */ (function () {
    function HTTPSnippet(input) {
        var _this = this;
        this.requests = [];
        this.prepare = function (harRequest) {
            var e_1, _a;
            var _b, _c, _d;
            var request = __assign(__assign({}, harRequest), { fullUrl: '', uriObj: {}, queryObj: {}, headersObj: {}, cookiesObj: {}, allHeaders: {} });
            // construct query objects
            if (request.queryString && request.queryString.length) {
                debug.info('queryString found, constructing queryString pair map');
                request.queryObj = request.queryString.reduce(reducer_1.reducer, {});
            }
            // construct headers objects
            if (request.headers && request.headers.length) {
                var http2VersionRegex_1 = /^HTTP\/2/;
                request.headersObj = request.headers.reduce(function (accumulator, _a) {
                    var _b;
                    var name = _a.name, value = _a.value;
                    var headerName = http2VersionRegex_1.exec(request.httpVersion)
                        ? name.toLocaleLowerCase()
                        : name;
                    return __assign(__assign({}, accumulator), (_b = {}, _b[headerName] = value, _b));
                }, {});
            }
            // construct headers objects
            if (request.cookies && request.cookies.length) {
                request.cookiesObj = request.cookies.reduceRight(function (accumulator, _a) {
                    var _b;
                    var name = _a.name, value = _a.value;
                    return (__assign(__assign({}, accumulator), (_b = {}, _b[name] = value, _b)));
                }, {});
            }
            // construct Cookie header
            var cookies = (_b = request.cookies) === null || _b === void 0 ? void 0 : _b.map(function (_a) {
                var name = _a.name, value = _a.value;
                return "".concat(encodeURIComponent(name), "=").concat(encodeURIComponent(value));
            });
            if (cookies === null || cookies === void 0 ? void 0 : cookies.length) {
                request.allHeaders.cookie = cookies.join('; ');
            }
            switch (request.postData.mimeType) {
                case 'multipart/mixed':
                case 'multipart/related':
                case 'multipart/form-data':
                case 'multipart/alternative':
                    // reset values
                    request.postData.text = '';
                    request.postData.mimeType = 'multipart/form-data';
                    if ((_c = request.postData) === null || _c === void 0 ? void 0 : _c.params) {
                        var form_1 = new form_data_1["default"]();
                        // The `form-data` module returns one of two things: a native FormData object, or its own polyfill
                        // Since the polyfill does not support the full API of the native FormData object, when this library is running in a browser environment it'll fail on two things:
                        //
                        //  1. The API for `form.append()` has three arguments and the third should only be present when the second is a
                        //    Blob or USVString.
                        //  1. `FormData.pipe()` isn't a function.
                        //
                        // Since the native FormData object is iterable, we easily detect what version of `form-data` we're working with here to allow `multipart/form-data` requests to be compiled under both browser and Node environments.
                        //
                        // This hack is pretty awful but it's the only way we can use this library in the browser as if we code this against just the native FormData object, we can't polyfill that back into Node because Blob and File objects, which something like `formdata-polyfill` requires, don't exist there.
                        // @ts-expect-error TODO
                        var isNativeFormData_1 = typeof form_1[Symbol.iterator] === 'function';
                        // TODO: THIS ABSOLUTELY MUST BE REMOVED.
                        // IT BREAKS SOME USE-CASES FOR MULTIPART FORMS THAT DEPEND ON BEING ABLE TO SET THE BOUNDARY.
                        // easter egg
                        var boundary = '---011000010111000001101001'; // this is binary for "api". yep.
                        if (!isNativeFormData_1) {
                            // @ts-expect-error THIS IS WRONG.  VERY WRONG.
                            form_1._boundary = boundary;
                        }
                        (_d = request.postData) === null || _d === void 0 ? void 0 : _d.params.forEach(function (param) {
                            var name = param.name;
                            var value = param.value || '';
                            var filename = param.fileName || null;
                            if (isNativeFormData_1) {
                                if ((0, form_data_2.isBlob)(value)) {
                                    // @ts-expect-error TODO
                                    form_1.append(name, value, filename);
                                }
                                else {
                                    form_1.append(name, value);
                                }
                            }
                            else {
                                form_1.append(name, value, {
                                    // @ts-expect-error TODO
                                    filename: filename,
                                    // @ts-expect-error TODO
                                    contentType: param.contentType || null
                                });
                            }
                        });
                        if (isNativeFormData_1) {
                            try {
                                for (var _e = __values((0, form_data_2.formDataIterator)(form_1, boundary)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var data_1 = _f.value;
                                    request.postData.text += data_1;
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_a = _e["return"])) _a.call(_e);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        else {
                            form_1.pipe(
                            // @ts-expect-error TODO
                            (0, event_stream_1.map)(function (data) {
                                request.postData.text += data;
                            }));
                        }
                        request.postData.boundary = boundary;
                        // Since headers are case-sensitive we need to see if there's an existing `Content-Type` header that we can override.
                        var contentTypeHeader = (0, headers_1.getHeaderName)(request.headersObj, 'content-type') || 'content-type';
                        request.headersObj[contentTypeHeader] = "multipart/form-data; boundary=".concat(boundary);
                    }
                    break;
                case 'application/x-www-form-urlencoded':
                    if (!request.postData.params) {
                        request.postData.text = '';
                    }
                    else {
                        // @ts-expect-error the `har-format` types make this challenging
                        // console.log(JSON.stringify(request.postData, null, 4));
                        request.postData.paramsObj = request.postData.params.reduce(reducer_1.reducer, {});
                        // always overwrite
                        request.postData.text = (0, querystring_1.stringify)(request.postData.paramsObj);
                    }
                    break;
                case 'text/json':
                case 'text/x-json':
                case 'application/json':
                case 'application/x-json':
                    request.postData.mimeType = 'application/json';
                    if (request.postData.text) {
                        try {
                            request.postData.jsonObj = JSON.parse(request.postData.text);
                        }
                        catch (e) {
                            debug.info(e);
                            // force back to `text/plain` if headers have proper content-type value, then this should also work
                            request.postData.mimeType = 'text/plain';
                        }
                    }
                    break;
            }
            // create allHeaders object
            var allHeaders = __assign(__assign({}, request.allHeaders), request.headersObj);
            var urlWithParsedQuery = (0, url_1.parse)(request.url, true, true); //?
            // query string key/value pairs in with literal querystrings containd within the url
            request.queryObj = __assign(__assign({}, request.queryObj), urlWithParsedQuery.query); //?
            // reset uriObj values for a clean url
            var search = (0, querystring_1.stringify)(request.queryObj);
            var uriObj = __assign(__assign({}, urlWithParsedQuery), { query: request.queryObj, search: search, path: search ? "".concat(urlWithParsedQuery.pathname, "?").concat(search) : urlWithParsedQuery.pathname });
            // keep the base url clean of queryString
            var url = (0, url_1.format)(__assign(__assign({}, urlWithParsedQuery), { query: null, search: null })); //?
            var fullUrl = (0, url_1.format)(__assign(__assign({}, urlWithParsedQuery), uriObj)); //?
            return __assign(__assign({}, request), { allHeaders: allHeaders, fullUrl: fullUrl, url: url, uriObj: uriObj });
        };
        this.convert = function (targetId, clientId, options) {
            if (!options && clientId) {
                options = clientId;
            }
            var target = targets_1.targets[targetId];
            if (!target) {
                return false;
            }
            var convert = target.clientsById[clientId || target.info["default"]].convert;
            // console.log(options);
            var results = _this.requests.map(function (request) { return convert(request, options); });
            return results.length === 1 ? results[0] : results;
        };
        var entries = [];
        // prep the main container
        this.requests = [];
        // is it har?
        if (isHarEntry(input)) {
            entries = input.log.entries;
        }
        else {
            entries = [
                {
                    request: input
                },
            ];
        }
        entries.forEach(function (_a) {
            var _b;
            var request = _a.request;
            // add optional properties to make validation successful
            var req = __assign({ bodySize: 0, headersSize: 0, headers: [], cookies: [], httpVersion: 'HTTP/1.1', queryString: [], postData: {
                    mimeType: ((_b = request.postData) === null || _b === void 0 ? void 0 : _b.mimeType) || 'application/octet-stream'
                } }, request);
            if ((0, har_validator_1.validateHarRequest)(req)) {
                _this.requests.push(_this.prepare(req));
            }
        });
    }
    return HTTPSnippet;
}());
exports.HTTPSnippet = HTTPSnippet;
