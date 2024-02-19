"use strict";
var axios = require('axios')["default"];
var options = { method: 'GET', url: 'https://mockbin.com/har' };
try {
    var data_1 = (await axios.request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
