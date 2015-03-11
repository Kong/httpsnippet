var http = require("http");

var options = {
  "method": "POST",
  "hostname": "mockbin.com",
  "port": null,
  "path": "/har?foo=bar&foo=baz&baz=abc&key=value",
  "headers": {
    "accept": "application/json",
    "content-type": "application/x-www-form-urlencoded",
    "cookie": "foo=bar; bar=baz"
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
