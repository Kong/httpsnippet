const options = {method: 'POST', headers: {'content-type': 'text/plain'}, body: 'Hello World'};

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
