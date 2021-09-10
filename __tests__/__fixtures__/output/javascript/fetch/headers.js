const options = {method: 'GET', headers: {accept: 'text/json', 'x-foo': 'Bar'}};

fetch('https://httpbin.org/headers', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
