"use strict";
var url = 'http://mockbin.com/har';
var options = { method: 'POST', headers: { cookie: 'foo=bar; bar=baz' } };
try {
    var response = await fetch(url, options);
    var data_1 = await response.json();
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
