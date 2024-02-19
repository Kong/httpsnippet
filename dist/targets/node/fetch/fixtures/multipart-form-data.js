"use strict";
var FormData = require('form-data');
var fetch = require('node-fetch');
var formData = new FormData();
formData.append('foo', 'bar');
var url = 'http://mockbin.com/har';
var options = { method: 'POST' };
options.body = formData;
try {
    var response = await fetch(url, options);
    var data_1 = await response.json();
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
