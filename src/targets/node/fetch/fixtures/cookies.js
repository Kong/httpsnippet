const url = 'https://httpbin.org/cookies';
const options = {method: 'GET', headers: {cookie: 'foo=bar; bar=baz'}};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));