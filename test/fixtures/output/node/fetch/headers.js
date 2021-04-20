const fetch = require('node-fetch');

const url = 'http://mockbin.com/har';
const options = {method: 'GET', headers: {accept: 'application/json', 'x-foo': 'Bar'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
