const fs = require('fs');
const unirest = require('unirest');

const req = unirest('POST', 'https://httpbin.org/anything');

req.headers({
  'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
});

req.multipart([
  {
    body: fs.createReadStream('src/fixtures/files/hello.txt'),
    'content-type': 'text/plain'
  }
]);

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});