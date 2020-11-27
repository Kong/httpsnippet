const FormData = require('form-data');
const fetch = require('node-fetch');
const formData = new FormData();
formData.append('foo','bar');

let url = 'http://mockbin.com/har';

let options = {
  method: 'POST',
  headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'}
};

options.body = formData;

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
