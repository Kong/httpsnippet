"use strict";
exports.__esModule = true;
exports.go = void 0;
var client_1 = require("./native/client");
exports.go = {
    info: {
        key: 'go',
        title: 'Go',
        extname: '.go',
        "default": 'native'
    },
    clientsById: {
        native: client_1.native
    }
};
