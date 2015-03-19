var request = require("request");

request({
  "method": "PROPFIND",
  "url": "http://mockbin.com/har"
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

