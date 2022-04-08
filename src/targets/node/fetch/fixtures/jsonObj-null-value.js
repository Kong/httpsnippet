const fetch = require('node-fetch');

let url = 'http://mockbin.com/har';

let options = {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: '{"foo":null}',
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));