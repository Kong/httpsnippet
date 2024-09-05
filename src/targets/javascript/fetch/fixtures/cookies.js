const options = {method: 'GET', headers: {cookie: 'foo=bar; bar=baz'}};

fetch('https://httpbin.org/cookies', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));