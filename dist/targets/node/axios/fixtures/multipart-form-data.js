"use strict";
var axios = require('axios')["default"];
var options = {
    method: 'POST',
    url: 'http://mockbin.com/har',
    headers: { 'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001' },
    data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="foo"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n'
};
try {
    var data_1 = (await axios.request(options)).data;
    console.log(data_1);
}
catch (error) {
    console.error(error);
}
