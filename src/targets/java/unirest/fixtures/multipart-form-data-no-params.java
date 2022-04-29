HttpResponse<String> response = Unirest.post("https://httpbin.org/anything")
  .header("Content-Type", "multipart/form-data")
  .asString();