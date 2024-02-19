"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var options = {
    method: 'POST',
    url: 'http://mockbin.com/har',
    headers: { 'content-type': 'application/json' },
    data: {
        number: 1,
        string: 'f"oo',
        arr: [1, 2, 3],
        nested: { a: 'b' },
        arr_mix: [1, 'a', { arr_mix_nested: {} }],
        boolean: false
    }
};
try {
    var data_1 = (await axios_1["default"].request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
