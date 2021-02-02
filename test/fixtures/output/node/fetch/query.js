const fetch = require('node-fetch');

const url = 'http://mockbin.com/har';

const options = {method: 'GET', qs: {foo: ['bar', 'baz'], baz: 'abc', key: 'value'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
