"use strict";
exports.__esModule = true;
exports.objc = void 0;
var client_1 = require("./nsurlsession/client");
exports.objc = {
    info: {
        key: 'objc',
        title: 'Objective-C',
        extname: '.m',
        "default": 'nsurlsession'
    },
    clientsById: {
        nsurlsession: client_1.nsurlsession
    }
};
