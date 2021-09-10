const unirest = require("unirest");

const req = unirest("POST", "https://httpbin.org/anything");

req.headers({
  "content-type": "application/x-www-form-urlencoded"
});

req.form({
  "foo": "bar",
  "hello": "world"
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

