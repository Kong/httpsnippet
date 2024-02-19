"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var form = new FormData();
form.append('foo', 'bar');
var options = {
    method: 'POST',
    url: 'http://mockbin.com/har',
    headers: { 'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001' },
    data: '[form]'
};
try {
    var data_1 = (await axios_1["default"].request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
