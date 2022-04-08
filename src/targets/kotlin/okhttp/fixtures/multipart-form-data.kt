val client = OkHttpClient()

val mediaType = MediaType.parse("multipart/form-data; boundary=---011000010111000001101001")
val body = RequestBody.create(mediaType, "-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n")
val request = Request.Builder()
  .url("http://mockbin.com/har")
  .post(body)
  .addHeader("Content-Type", "multipart/form-data; boundary=---011000010111000001101001")
  .build()

val response = client.newCall(request).execute()