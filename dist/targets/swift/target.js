"use strict";
exports.__esModule = true;
exports.swift = void 0;
var client_1 = require("./nsurlsession/client");
exports.swift = {
    info: {
        key: 'swift',
        title: 'Swift',
        extname: '.swift',
        "default": 'nsurlsession'
    },
    clientsById: {
        nsurlsession: client_1.nsurlsession
    }
};
