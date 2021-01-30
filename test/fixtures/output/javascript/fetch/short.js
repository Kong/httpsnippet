const options = {method: 'GET'};

fetch('http://mockbin.com/har', options)
  .then(response => console.log(response))
  .catch(err => console.error(err));
