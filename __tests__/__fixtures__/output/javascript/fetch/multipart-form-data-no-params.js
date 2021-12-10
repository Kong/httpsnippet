const options = {method: 'POST', headers: {'Content-Type': 'multipart/form-data'}};

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
