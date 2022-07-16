HttpResponse<String> response = Unirest.get("http://httpbin.org/anything")
  .asString();