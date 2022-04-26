const unirest = require('unirest');

const req = unirest('GET', 'http://mockbin.com/har');

req.query({
  foo: [
    'bar',
    'baz'
  ],
  baz: 'abc',
  key: 'value'
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});