HttpResponse<String> response = Unirest.get("https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")
  .asString();
