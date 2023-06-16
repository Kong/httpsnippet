HttpResponse<String> response = Unirest.get("https://httpbin.org/headers")
  .header("accept", "application/json")
  .header("x-foo", "Bar")
  .header("x-bar", "Foo")
  .header("quoted-value", "\"quoted\" 'string'")
  .asString();