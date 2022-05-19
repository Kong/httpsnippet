const request = require('request');

const options = {
  method: 'GET',
  url: 'https://httpbin.org/headers',
  headers: {accept: 'text/json', 'x-foo': 'Bar', 'x-bar': 'Foo'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

