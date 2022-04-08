const options = { method: 'POST', headers: { 'content-type': 'text/plain' }, body: 'Hello World' };

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
