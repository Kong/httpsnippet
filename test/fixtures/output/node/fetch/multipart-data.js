var fs = require("fs");
var FormData = require("form-data");
var fetch = require("node-fetch");

var formData = new FormData();

formData.append("foo", fs.createReadStream("hello.txt"));

var url = 'http://mockbin.com/har';

var options = {
  method: 'POST',
  headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'}
};

options.body = formData;

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
