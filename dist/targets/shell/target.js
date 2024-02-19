"use strict";
exports.__esModule = true;
exports.shell = void 0;
var client_1 = require("./curl/client");
var client_2 = require("./httpie/client");
var client_3 = require("./wget/client");
exports.shell = {
    info: {
        key: 'shell',
        title: 'Shell',
        extname: '.sh',
        "default": 'curl'
    },
    clientsById: {
        curl: client_1.curl,
        httpie: client_2.httpie,
        wget: client_3.wget
    }
};
