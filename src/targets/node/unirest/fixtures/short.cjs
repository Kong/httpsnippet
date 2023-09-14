const unirest = require('unirest');

const req = unirest('GET', 'https://httpbin.org/anything');

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});