var request = require("request");

request({
  "method": "GET",
  "url": "http://mockbin.com/har",
  "qs": {
    "foo": [
      "bar",
      "baz"
    ],
    "baz": "abc",
    "key": "value"
  }
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

