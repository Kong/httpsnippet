HttpResponse<String> response = Unirest.customMethod("PROPFIND","https://httpbin.org/anything")
  .asString();
