HttpResponse<String> response = Unirest.get("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")
  .asString();
