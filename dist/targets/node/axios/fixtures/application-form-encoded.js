"use strict";
var axios = require('axios')["default"];
var URLSearchParams = require('url').URLSearchParams;
var encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');
encodedParams.set('hello', 'world');
var options = {
    method: 'POST',
    url: 'http://mockbin.com/har',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: encodedParams
};
try {
    var data_1 = (await axios.request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
