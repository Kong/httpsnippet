const unirest = require('unirest');

const req = unirest('POST', 'http://mockbin.com/har');

const CookieJar = unirest.jar();
CookieJar.add('foo=bar', 'http://mockbin.com/har');
CookieJar.add('bar=baz', 'http://mockbin.com/har');
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