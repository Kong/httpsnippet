const unirest = require("unirest");

const req = unirest("GET", "https://httpbin.org/cookies");

const CookieJar = unirest.jar();
CookieJar.add("foo=bar","https://httpbin.org/cookies");
CookieJar.add("bar=baz","https://httpbin.org/cookies");
req.jar(CookieJar);

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

