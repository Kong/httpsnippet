var request = require("request");

request({
  "method": "GET",
  "url": "http://mockbin.com/har",
  "headers": {
    "x-foo": "Bar",
    "accept": "application/json"
  }
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

