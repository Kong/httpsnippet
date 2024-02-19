"use strict";
var url = 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value';
var options = {
    method: 'POST',
    headers: {
        cookie: 'foo=bar; bar=baz',
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ foo: 'bar' })
};
try {
    var response = await fetch(url, options);
    var data_1 = await response.json();
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
