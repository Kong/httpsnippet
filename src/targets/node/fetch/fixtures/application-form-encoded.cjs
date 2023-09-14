const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const encodedParams = new URLSearchParams();

encodedParams.set('foo', 'bar');
encodedParams.set('hello', 'world');

const url = 'https://httpbin.org/anything';
const options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: encodedParams
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));