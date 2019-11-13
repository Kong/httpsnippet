const fetch = require('node-fetch');

let url = 'http://mockbin.com/har';

let options = {
  method: 'POST',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  body: {foo: 'bar', hello: 'world'}
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
