const http = require("https");

const options = {
  "method": "POST",
  "hostname": "httpbin.org",
  "port": null,
  "path": "/anything",
  "headers": {
    "content-type": "application/json"
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

req.write(JSON.stringify({foo: null}));
req.end();
