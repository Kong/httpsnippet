const request = require('request');

const options = {
  method: 'GET',
  url: 'https://httpbin.org/headers',
  headers: {accept: 'text/json', 'x-foo': 'Bar'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

