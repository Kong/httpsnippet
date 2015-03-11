var unirest = require("unirest");

var CookieJar = unirest.jar();
CookieJar.add("foo=bar","http://mockbin.com/har")
CookieJar.add("bar=baz","http://mockbin.com/har")

unirest.post("http://mockbin.com/har")
  .jar(CookieJar)
  .end(function(response){
    if (response.error) throw new Error(response.error);

    console.log(response.body);
  });

