"use strict";
exports.__esModule = true;
exports.restmethod = void 0;
var common_1 = require("../common");
exports.restmethod = {
    info: {
        key: 'restmethod',
        title: 'Invoke-RestMethod',
        link: 'https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-RestMethod',
        description: 'Powershell Invoke-RestMethod client'
    },
    convert: (0, common_1.generatePowershellConvert)('Invoke-RestMethod')
};
