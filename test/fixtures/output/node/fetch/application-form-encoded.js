const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const encodedParams = new URLSearchParams();

encodedParams.set('foo', 'bar');
encodedParams.set('hello', 'world');

let url = 'http://mockbin.com/har';

let options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: encodedParams,
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
