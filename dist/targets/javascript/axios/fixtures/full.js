"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');
var options = {
    method: 'POST',
    url: 'http://mockbin.com/har',
    params: { foo: ['bar', 'baz'], baz: 'abc', key: 'value' },
    headers: {
        cookie: 'foo=bar; bar=baz',
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
    },
    data: encodedParams
};
try {
    var data_1 = (await axios_1["default"].request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
