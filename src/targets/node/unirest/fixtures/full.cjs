const unirest = require('unirest');

const req = unirest('POST', 'https://httpbin.org/anything');

const CookieJar = unirest.jar();
CookieJar.add('foo=bar', 'https://httpbin.org/anything');
CookieJar.add('bar=baz', 'https://httpbin.org/anything');
req.jar(CookieJar);

req.query({
  foo: [
    'bar',
    'baz'
  ],
  baz: 'abc',
  key: 'value'
});

req.headers({
  accept: 'application/json',
  'content-type': 'application/x-www-form-urlencoded'
});

req.form({
  foo: 'bar'
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});