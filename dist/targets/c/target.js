"use strict";
exports.__esModule = true;
exports.c = void 0;
var client_1 = require("./libcurl/client");
exports.c = {
    info: {
        key: 'c',
        title: 'C',
        extname: '.c',
        "default": 'libcurl'
    },
    clientsById: {
        libcurl: client_1.libcurl
    }
};
