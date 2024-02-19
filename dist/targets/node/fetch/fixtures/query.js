"use strict";
var fetch = require('node-fetch');
var url = 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value';
var options = { method: 'GET' };
try {
    var response = await fetch(url, options);
    var data_1 = await response.json();
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
