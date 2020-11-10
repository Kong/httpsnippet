const fetch = require('node-fetch');

let url = 'http://mockbin.com/har';

let options = {method: 'GET', qs: {'foo[bar]': 'baz,zap', fiz: 'buz', key: 'value'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
