"use strict";
var axios = require('axios')["default"];
var options = {
    method: 'GET',
    url: 'http://mockbin.com/har',
    params: { foo: ['bar', 'baz'], baz: 'abc', key: 'value' }
};
try {
    var data_1 = (await axios.request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
