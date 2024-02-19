"use strict";
exports.__esModule = true;
exports.javascript = void 0;
var client_1 = require("./axios/client");
var client_2 = require("./fetch/client");
var client_3 = require("./jquery/client");
var client_4 = require("./xhr/client");
exports.javascript = {
    info: {
        key: 'javascript',
        title: 'JavaScript',
        extname: '.js',
        "default": 'xhr'
    },
    clientsById: {
        xhr: client_4.xhr,
        axios: client_1.axios,
        fetch: client_2.fetch,
        jquery: client_3.jquery
    }
};
