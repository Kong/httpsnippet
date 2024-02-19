"use strict";
var axios = require('axios')["default"];
var options = {
    method: 'POST',
    url: 'http://mockbin.com/har',
    headers: { 'Content-Type': 'multipart/form-data' }
};
try {
    var data_1 = (await axios.request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
