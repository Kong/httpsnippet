"use strict";
exports.__esModule = true;
exports.ocaml = void 0;
var client_1 = require("./cohttp/client");
exports.ocaml = {
    info: {
        key: 'ocaml',
        title: 'OCaml',
        extname: '.ml',
        "default": 'cohttp'
    },
    clientsById: {
        cohttp: client_1.cohttp
    }
};
