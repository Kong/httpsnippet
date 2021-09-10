const fetch = require('node-fetch');

const url = 'https://httpbin.org/headers';
const options = {method: 'GET', headers: {accept: 'text/json', 'x-foo': 'Bar'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
