const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const formData = new FormData();

formData.append('foo', fs.createReadStream('hello.txt'));
formData.append('bar', 'Bonjour le monde');

const url = 'http://mockbin.com/har';
const options = {method: 'POST'};

options.body = formData;

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));