"use strict";
var axios = require('axios')["default"];
var options = {
    method: 'GET',
    url: 'http://mockbin.com/har',
    headers: {
        accept: 'application/json',
        'x-foo': 'Bar',
        'quoted-value': '"quoted" \'string\''
    }
};
try {
    var data_1 = (await axios.request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
