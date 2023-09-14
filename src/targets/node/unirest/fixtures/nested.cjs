const unirest = require('unirest');

const req = unirest('GET', 'https://httpbin.org/anything');

req.query({
  'foo[bar]': 'baz,zap',
  fiz: 'buz',
  key: 'value'
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});