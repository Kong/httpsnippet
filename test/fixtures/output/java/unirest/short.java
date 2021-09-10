HttpResponse<String> response = Unirest.get("https://httpbin.org/anything")
  .asString();
