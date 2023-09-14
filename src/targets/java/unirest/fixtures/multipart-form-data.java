HttpResponse<String> response = Unirest.post("https://httpbin.org/anything")
  .header("Content-Type", "multipart/form-data; boundary=---011000010111000001101001")
  .body("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--")
  .asString();