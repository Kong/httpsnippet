"use strict";
exports.__esModule = true;
exports.ruby = void 0;
var client_1 = require("./native/client");
exports.ruby = {
    info: {
        key: 'ruby',
        title: 'Ruby',
        extname: '.rb',
        "default": 'native'
    },
    clientsById: {
        native: client_1.native
    }
};
