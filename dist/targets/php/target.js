"use strict";
exports.__esModule = true;
exports.php = void 0;
var client_1 = require("./curl/client");
var client_2 = require("./guzzle/client");
var client_3 = require("./http1/client");
var client_4 = require("./http2/client");
exports.php = {
    info: {
        key: 'php',
        title: 'PHP',
        extname: '.php',
        "default": 'curl'
    },
    clientsById: {
        curl: client_1.curl,
        guzzle: client_2.guzzle,
        http1: client_3.http1,
        http2: client_4.http2
    }
};
