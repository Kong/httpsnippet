const request = require('request');

const options = {
  method: 'GET',
  url: 'https://httpbin.org/headers',
  headers: {
    accept: 'application/json',
    'x-foo': 'Bar',
    'x-bar': 'Foo',
    'quoted-value': '"quoted" \'string\''
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});