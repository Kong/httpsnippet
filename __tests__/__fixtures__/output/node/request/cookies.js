const request = require('request');

const jar = request.jar();
jar.setCookie(request.cookie('foo=bar'), 'https://httpbin.org/cookies');
jar.setCookie(request.cookie('bar=baz'), 'https://httpbin.org/cookies');

const options = {method: 'GET', url: 'https://httpbin.org/cookies', jar: jar};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

