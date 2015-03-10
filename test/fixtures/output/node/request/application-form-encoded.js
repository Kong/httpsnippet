var request = require("request");

request({
  "method": "POST",
  "url": "http://mockbin.com/har",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "form": {
    "foo": "bar",
    "hello": "world"
  }
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

