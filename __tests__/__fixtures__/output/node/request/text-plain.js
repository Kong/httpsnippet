const request = require('request');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'text/plain'},
  body: 'Hello World'
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

