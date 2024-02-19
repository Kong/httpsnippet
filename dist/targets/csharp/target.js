"use strict";
exports.__esModule = true;
exports.csharp = void 0;
var client_1 = require("./httpclient/client");
var client_2 = require("./restsharp/client");
exports.csharp = {
    info: {
        key: 'csharp',
        title: 'C#',
        extname: '.cs',
        "default": 'restsharp'
    },
    clientsById: {
        httpclient: client_1.httpclient,
        restsharp: client_2.restsharp
    }
};
