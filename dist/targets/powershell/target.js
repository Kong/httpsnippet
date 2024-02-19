"use strict";
exports.__esModule = true;
exports.powershell = void 0;
var client_1 = require("./restmethod/client");
var client_2 = require("./webrequest/client");
exports.powershell = {
    info: {
        key: 'powershell',
        title: 'Powershell',
        extname: '.ps1',
        "default": 'webrequest'
    },
    clientsById: {
        webrequest: client_2.webrequest,
        restmethod: client_1.restmethod
    }
};
