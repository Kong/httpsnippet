var request = require("request");

request({
  "method": "POST",
  "url": "http://mockbin.com/har",
  "headers": {
    "content-type": "text/plain"
  },
  "body": "Hello World"
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

