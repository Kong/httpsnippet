const options = {method: 'POST', headers: {'Content-Type': 'multipart/form-data'}};

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));