const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const formData = new FormData();

formData.append('foo', fs.createReadStream('__tests__/__fixtures__/files/hello.txt'));

const url = 'https://httpbin.org/anything';
const options = {
  method: 'POST',
  headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'}
};

options.body = formData;

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
