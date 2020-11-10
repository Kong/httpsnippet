const request = require('request');

const options = {
  method: 'GET',
  url: 'http://mockbin.com/har',
  qs: {'foo[bar]': 'baz,zap', fiz: 'buz', key: 'value'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

