const request = require('request');

const options = {method: 'PROPFIND', url: 'https://httpbin.org/anything'};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

