const request = require('request');

const jar = request.jar();
jar.setCookie(request.cookie('foo=bar'), 'https://httpbin.org/anything');
jar.setCookie(request.cookie('bar=baz'), 'https://httpbin.org/anything');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value',
  headers: {
    accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
  form: {foo: 'bar'},
  jar: jar
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

