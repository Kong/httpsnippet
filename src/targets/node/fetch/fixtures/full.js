const { URLSearchParams } = require('url');
const fetch = require('node-fetch');

const encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');

const url = 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    cookie: 'foo=bar; bar=baz'
  },
  body: encodedParams
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}