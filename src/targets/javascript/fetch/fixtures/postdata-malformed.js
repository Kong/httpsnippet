const options = {method: 'POST', headers: {'content-type': 'application/json'}};

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));