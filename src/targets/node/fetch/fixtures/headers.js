const fetch = require('node-fetch');

const url = 'https://httpbin.org/headers';
const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-foo': 'Bar', 'x-bar': 'Foo'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));