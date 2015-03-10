var request = require("request");

request({
  "method": "GET",
  "url": "http://mockbin.com/har",
  "qs": {
    "key": "value",
    "baz": "abc",
    "foo": [
      "bar",
      "baz"
    ]
  }
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

