"use strict";
var axios = require('axios')["default"];
var options = {
    method: 'POST',
    url: 'http://mockbin.com/har',
    headers: { cookie: 'foo=bar; bar=baz' }
};
try {
    var data_1 = (await axios.request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
