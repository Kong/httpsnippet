"use strict";
exports.__esModule = true;
exports.java = void 0;
var client_1 = require("./asynchttp/client");
var client_2 = require("./nethttp/client");
var client_3 = require("./okhttp/client");
var client_4 = require("./unirest/client");
exports.java = {
    info: {
        key: 'java',
        title: 'Java',
        extname: '.java',
        "default": 'unirest'
    },
    clientsById: {
        asynchttp: client_1.asynchttp,
        nethttp: client_2.nethttp,
        okhttp: client_3.okhttp,
        unirest: client_4.unirest
    }
};
