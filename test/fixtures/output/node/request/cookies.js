var request = require("request");


var jar = request.jar();
jar.setCookie(request.cookie("foo=bar"), "http://mockbin.com/har");
jar.setCookie(request.cookie("bar=baz"), "http://mockbin.com/har");

request({
  "method": "POST",
  "url": "http://mockbin.com/har",
  "jar": jar
}, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

