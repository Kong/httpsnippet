"use strict";
exports.__esModule = true;
exports.python = void 0;
var client_1 = require("./python3/client");
var client_2 = require("./requests/client");
exports.python = {
    info: {
        key: 'python',
        title: 'Python',
        extname: '.py',
        "default": 'python3'
    },
    clientsById: {
        python3: client_1.python3,
        requests: client_2.requests
    }
};
