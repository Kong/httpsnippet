const fetch = require('node-fetch');

const url = 'https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value';
const options = {method: 'GET'};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
