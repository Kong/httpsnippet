HttpResponse<String> response = Unirest.get("https://httpbin.org/headers")
  .header("accept", "text/json")
  .header("x-foo", "Bar")
  .header("x-bar", "Foo")
  .asString();
