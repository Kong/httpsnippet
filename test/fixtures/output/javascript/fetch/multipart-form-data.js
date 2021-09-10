const form = new FormData();
form.append("foo", "bar");

const options = {
  method: 'POST',
  headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'}
};

options.body = form;

fetch('https://httpbin.org/anything', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
