"use strict";
var unirest = require('unirest');
var req = unirest('GET', 'http://mockbin.com/har');
req.headers({
    accept: 'application/json',
    'x-foo': 'Bar',
    'quoted-value': '"quoted" \'string\''
});
req.end(function (res) {
    if (res.error)
        throw new Error(res.error);
    console.log(res.body);
});
