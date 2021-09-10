const fs = require('fs');
const request = require('request');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
  formData: {
    foo: {
      value: fs.createReadStream('__tests__/__fixtures__/files/hello.txt'),
      options: {filename: '__tests__/__fixtures__/files/hello.txt', contentType: 'text/plain'}
    }
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

