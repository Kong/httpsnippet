HttpResponse<String> response = Unirest.get("https://httpbin.org/cookies")
  .header("cookie", "foo=bar; bar=baz")
  .asString();
