const options = {method: 'POST', headers: {'content-type': 'text/plain'}, body: 'Hello World'};

fetch('https://httpbin.org/anything', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));