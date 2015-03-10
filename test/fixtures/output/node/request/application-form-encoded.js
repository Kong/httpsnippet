var http = require("http");
var querystring = require("querystring");

var options = {
  "method": "POST",
  "hostname": "mockbin.com",
  "port": null,
  "path": "/har?",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
  });
});

var postData = querystring.stringify({"foo":"bar"});
req.write(postData);
req.end();
