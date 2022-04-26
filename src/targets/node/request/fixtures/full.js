const request = require('request');

const jar = request.jar();
jar.setCookie(request.cookie('foo=bar'), 'http://mockbin.com/har');
jar.setCookie(request.cookie('bar=baz'), 'http://mockbin.com/har');

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  qs: {foo: ['bar', 'baz'], baz: 'abc', key: 'value'},
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