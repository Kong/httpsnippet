"use strict";
exports.__esModule = true;
exports.customTarget = void 0;
var client_1 = require("../targets/node/request/client");
exports.customTarget = {
    info: {
        key: 'js-variant',
        title: 'JavaScript Variant',
        extname: '.js',
        "default": 'request'
    },
    clientsById: {
        request: client_1.request
    }
};
