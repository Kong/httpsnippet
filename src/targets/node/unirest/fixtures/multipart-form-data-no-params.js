const unirest = require('unirest');

const req = unirest('POST', 'http://mockbin.com/har');

req.headers({
  'Content-Type': 'multipart/form-data'
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});