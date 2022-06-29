const fetch = require('node-fetch');

let url = 'http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value';

let options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));