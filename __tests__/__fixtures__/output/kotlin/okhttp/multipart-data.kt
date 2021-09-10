val client = OkHttpClient()

val mediaType = MediaType.parse("multipart/form-data; boundary=---011000010111000001101001")
val body = RequestBody.create(mediaType, "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"hello.txt\"\r\nContent-Type: text/plain\r\n\r\nHello World\r\n-----011000010111000001101001--\r\n")
val request = Request.Builder()
  .url("https://httpbin.org/anything")
  .post(body)
  .addHeader("content-type", "multipart/form-data; boundary=---011000010111000001101001")
  .build()

val response = client.newCall(request).execute()
