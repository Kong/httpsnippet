const options = {method: 'POST', headers: {'Content-Type': 'multipart/form-data'}};

fetch('https://httpbin.org/anything', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));