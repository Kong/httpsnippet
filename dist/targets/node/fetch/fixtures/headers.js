"use strict";
var fetch = require('node-fetch');
var url = 'http://mockbin.com/har';
var options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        'x-foo': 'Bar',
        'quoted-value': '"quoted" \'string\''
    }
};
try {
    var response = await fetch(url, options);
    var data_1 = await response.json();
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
