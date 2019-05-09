var request = require("request");

var options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {'content-type': 'application/json'},
  body: {foo: 'bar'},
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

