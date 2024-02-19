"use strict";
exports.__esModule = true;
exports.http = void 0;
var client_1 = require("./http1.1/client");
exports.http = {
    info: {
        key: 'http',
        title: 'HTTP',
        extname: null,
        "default": '1.1'
    },
    clientsById: {
        'http1.1': client_1.http11
    }
};
