"use strict";
exports.__esModule = true;
exports.clojure = void 0;
var client_1 = require("./clj_http/client");
exports.clojure = {
    info: {
        key: 'clojure',
        title: 'Clojure',
        extname: '.clj',
        "default": 'clj_http'
    },
    clientsById: {
        clj_http: client_1.clj_http
    }
};
