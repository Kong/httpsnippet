"use strict";
/**
 * @license https://raw.githubusercontent.com/node-fetch/node-fetch/master/LICENSE.md
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 - 2020 Node Fetch Team
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Extracted from https://github.com/node-fetch/node-fetch/blob/64c5c296a0250b852010746c76144cb9e14698d9/src/utils/form-data.js
 */
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.formDataIterator = exports.isBlob = void 0;
var carriage = '\r\n';
var dashes = '-'.repeat(2);
var NAME = Symbol.toStringTag;
var isBlob = function (object) {
    return typeof object === 'object' &&
        typeof object.arrayBuffer === 'function' &&
        typeof object.type === 'string' &&
        typeof object.stream === 'function' &&
        typeof object.constructor === 'function' &&
        /^(Blob|File)$/.test(object[NAME]);
};
exports.isBlob = isBlob;
var getFooter = function (boundary) { return "".concat(dashes).concat(boundary).concat(dashes).concat(carriage.repeat(2)); };
var getHeader = function (boundary, name, field) {
    var header = '';
    header += "".concat(dashes).concat(boundary).concat(carriage);
    header += "Content-Disposition: form-data; name=\"".concat(name, "\"");
    if ((0, exports.isBlob)(field)) {
        header += "; filename=\"".concat(field.name, "\"").concat(carriage);
        header += "Content-Type: ".concat(field.type || 'application/octet-stream');
    }
    return "".concat(header).concat(carriage.repeat(2));
};
var formDataIterator = function (form, boundary) {
    var form_1, form_1_1, _a, name, value, e_1_1;
    var e_1, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 10, 11, 12]);
                form_1 = __values(form), form_1_1 = form_1.next();
                _c.label = 1;
            case 1:
                if (!!form_1_1.done) return [3 /*break*/, 9];
                _a = __read(form_1_1.value, 2), name = _a[0], value = _a[1];
                return [4 /*yield*/, getHeader(boundary, name, value)];
            case 2:
                _c.sent();
                if (!(0, exports.isBlob)(value)) return [3 /*break*/, 4];
                return [5 /*yield**/, __values(value.stream())];
            case 3:
                _c.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, value];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6: return [4 /*yield*/, carriage];
            case 7:
                _c.sent();
                _c.label = 8;
            case 8:
                form_1_1 = form_1.next();
                return [3 /*break*/, 1];
            case 9: return [3 /*break*/, 12];
            case 10:
                e_1_1 = _c.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 11:
                try {
                    if (form_1_1 && !form_1_1.done && (_b = form_1["return"])) _b.call(form_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 12: return [4 /*yield*/, getFooter(boundary)];
            case 13:
                _c.sent();
                return [2 /*return*/];
        }
    });
};
exports.formDataIterator = formDataIterator;
