const fs = require('fs');
const request = require('request');

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
  formData: {
    foo: {
      value: fs.createReadStream('hello.txt'),
      options: {filename: 'hello.txt', contentType: 'text/plain'}
    },
    bar: 'Bonjour le monde'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});