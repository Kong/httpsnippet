const request = require('request');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
  formData: {foo: 'bar'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

