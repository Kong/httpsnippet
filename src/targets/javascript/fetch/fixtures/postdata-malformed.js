const options = {method: 'POST', headers: {'content-type': 'application/json'}};

fetch('https://httpbin.org/anything', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));