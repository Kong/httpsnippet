"use strict";
exports.__esModule = true;
exports.webrequest = void 0;
var common_1 = require("../common");
exports.webrequest = {
    info: {
        key: 'webrequest',
        title: 'Invoke-WebRequest',
        link: 'https://docs.microsoft.com/en-us/powershell/module/Microsoft.PowerShell.Utility/Invoke-WebRequest',
        description: 'Powershell Invoke-WebRequest client'
    },
    convert: (0, common_1.generatePowershellConvert)('Invoke-WebRequest')
};
