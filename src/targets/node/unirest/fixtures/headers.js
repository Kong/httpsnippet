const unirest = require('unirest');

const req = unirest('GET', 'https://httpbin.org/headers');

req.headers({
  accept: 'application/json',
  'x-foo': 'Bar',
  'x-bar': 'Foo'
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});