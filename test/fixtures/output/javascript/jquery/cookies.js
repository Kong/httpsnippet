const settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://httpbin.org/cookies",
  "method": "GET",
  "headers": {
    "cookie": "foo=bar; bar=baz"
  }
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
