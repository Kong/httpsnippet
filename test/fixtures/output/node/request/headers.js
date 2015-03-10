var request = require("request");

request({
  "method": "GET",
  "url": "http://mockbin.com/har",
  "headers": {
    "Accept": "application/json",
    "X-Foo": "Bar"
  }
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

