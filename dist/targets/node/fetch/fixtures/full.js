"use strict";
var URLSearchParams = require('url').URLSearchParams;
var fetch = require('node-fetch');
var encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');
var url = 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value';
var options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        cookie: 'foo=bar; bar=baz'
    },
    body: encodedParams
};
try {
    var response = await fetch(url, options);
    var data_1 = await response.json();
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
