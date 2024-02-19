"use strict";
exports.__esModule = true;
exports.node = void 0;
var client_1 = require("./axios/client");
var client_2 = require("./fetch/client");
var client_3 = require("./native/client");
var client_4 = require("./request/client");
var client_5 = require("./unirest/client");
exports.node = {
    info: {
        key: 'node',
        title: 'Node.js',
        extname: '.js',
        "default": 'native'
    },
    clientsById: {
        native: client_3.native,
        request: client_4.request,
        unirest: client_5.unirest,
        axios: client_1.axios,
        fetch: client_2.fetch
    }
};
