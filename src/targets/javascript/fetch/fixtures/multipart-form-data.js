const form = new FormData();
form.append('foo', 'bar');

const options = {method: 'POST'};

options.body = form;

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));