//Import unirest libarary (http://unirest.io/java.html) 

HttpResponse<String> response = Unirest.post("http://mockbin.com/har")
  .header("content-type", "application/x-www-form-urlencoded")
  .body("foo=bar&hello=world")
  .asString();
