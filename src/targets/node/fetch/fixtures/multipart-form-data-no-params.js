const fetch = require('node-fetch');

let url = 'https://httpbin.org/anything';

let options = {method: 'POST', headers: {'Content-Type': 'multipart/form-data'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));