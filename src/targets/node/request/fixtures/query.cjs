const request = require('request');

const options = {
  method: 'GET',
  url: 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value'
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});