const options = {
  method: 'POST',
  headers: {'content-type': 'application/json'},
  body: '{"foo":"bar"}'
};

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
