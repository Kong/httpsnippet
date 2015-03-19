var request = require("request");

request({
  "method": "GET",
  "url": "https://mockbin.com/har"
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

