const request = require('request');

const options = {
  method: 'GET',
  url: 'https://httpbin.org/anything',
  qs: {'foo[bar]': 'baz,zap', fiz: 'buz', key: 'value'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

