"use strict";
exports.__esModule = true;
exports.kotlin = void 0;
var client_1 = require("./okhttp/client");
exports.kotlin = {
    info: {
        key: 'kotlin',
        title: 'Kotlin',
        extname: '.kt',
        "default": 'okhttp'
    },
    clientsById: {
        okhttp: client_1.okhttp
    }
};
