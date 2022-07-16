HttpResponse<String> response = Unirest.post("https://httpbin.org/anything")
  .header("content-type", "application/json")
  .body("{\n  \"foo\": \"bar\"\n}")
  .asString();