var http = require("http");

var options = {
  "method": "POST",
  "hostname": "mockbin.com",
  "port": null,
  "path": "/har?baz=abc&foo=bar&foo=baz",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "foo=bar; bar=baz"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body);
  });
});

req.write("foo=bar");
req.end();
