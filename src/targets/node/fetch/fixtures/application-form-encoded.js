const { URLSearchParams } = require('url');
const fetch = require('node-fetch');

const encodedParams = new URLSearchParams();
encodedParams.set('foo', 'bar');
encodedParams.set('hello', 'world');

const url = 'http://mockbin.com/har';
const options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: encodedParams
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}