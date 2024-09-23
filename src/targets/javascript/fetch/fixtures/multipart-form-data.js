const form = new FormData();
form.append('foo', 'bar');

const options = {method: 'POST'};

options.body = form;

fetch('https://httpbin.org/anything', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));