const form = new FormData();
form.append("foo", "Hello World");

const options = {method: 'POST'};

options.body = form;

fetch('http://mockbin.com/har', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
