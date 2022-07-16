const options = {method: 'GET', headers: {cookie: 'foo=bar; bar=baz'}};

fetch('https://httpbin.org/cookies', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));