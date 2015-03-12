var http = require("http");

var options = {
  "method": "POST",
  "hostname": "mockbin.com",
  "port": null,
  "path": "/har",
  "headers": {
    "content-type": "application/json"
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

req.write("{\"number\": 1, \"string\": \"f\\\"oo\", \"arr\": [1, 2, 3], \"nested\": {\"a\": \"b\"}, \"arr_mix\": [1, \"a\", {\"arr_mix_nested\": {}}] }");
req.end();
