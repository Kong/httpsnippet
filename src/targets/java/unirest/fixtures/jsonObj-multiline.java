HttpResponse<String> response = Unirest.post("http://mockbin.com/har")
  .header("content-type", "application/json")
  .body("{\n  \"foo\": \"bar\"\n}")
  .asString();