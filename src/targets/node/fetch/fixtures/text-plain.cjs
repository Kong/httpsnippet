const fetch = require('node-fetch');

const url = 'https://httpbin.org/anything';
const options = {method: 'POST', headers: {'content-type': 'text/plain'}, body: 'Hello World'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));