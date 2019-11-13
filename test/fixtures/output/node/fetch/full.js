const fetch = require('node-fetch');

let url = 'http://mockbin.com/har';

let options = {
  method: 'POST',
  qs: {foo: ['bar', 'baz'], baz: 'abc', key: 'value'},
  headers: {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
    cookie: 'foo=bar; bar=baz; '
  },
  body: {foo: 'bar'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
