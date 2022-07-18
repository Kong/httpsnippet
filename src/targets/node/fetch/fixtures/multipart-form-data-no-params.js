const fetch = require('node-fetch');

const url = 'http://mockbin.com/har';
const options = {method: 'POST', headers: {'Content-Type': 'multipart/form-data'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));