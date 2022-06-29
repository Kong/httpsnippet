const unirest = require('unirest');

const req = unirest('POST', 'http://mockbin.com/har');

req.headers({
  'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
});

req.multipart([
  {
    body: 'Hello World',
    'content-type': 'text/plain'
  },
  {
    body: 'Bonjour le monde'
  }
]);

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});