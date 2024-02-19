"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios"));
var options = {
    method: 'GET',
    url: 'http://mockbin.com/har',
    headers: {
        accept: 'application/json',
        'x-foo': 'Bar',
        'quoted-value': '"quoted" \'string\''
    }
};
try {
    var data_1 = (await axios_1["default"].request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
