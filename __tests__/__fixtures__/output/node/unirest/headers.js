const unirest = require("unirest");

const req = unirest("GET", "https://httpbin.org/headers");

req.headers({
  "accept": "text/json",
  "x-foo": "Bar"
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

