HttpResponse<String> response = Unirest.post("http://mockbin.com/har")
  .header("Content-Type", "multipart/form-data")
  .asString();