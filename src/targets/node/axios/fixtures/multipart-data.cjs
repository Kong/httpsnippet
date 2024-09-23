const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
  data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="foo"; filename="src/fixtures/files/hello.txt"\r\nContent-Type: text/plain\r\n\r\nHello World\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="bar"\r\n\r\nBonjour le monde\r\n-----011000010111000001101001--'
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });