const options = { method: 'POST', headers: { cookie: 'foo=bar; bar=baz' } };

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
