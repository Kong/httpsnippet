const http = require("https");

const options = {
  "method": "GET",
  "hostname": "httpbin.org",
  "port": null,
  "path": "/headers",
  "headers": {
    "accept": "text/json",
    "x-foo": "Bar",
    "x-bar": "Foo"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
