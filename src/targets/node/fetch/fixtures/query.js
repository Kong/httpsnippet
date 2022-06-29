const fetch = require('node-fetch');

let url = 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value';

let options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));