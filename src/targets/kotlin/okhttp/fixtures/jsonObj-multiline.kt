val client = OkHttpClient()

val mediaType = MediaType.parse("application/json")
val body = RequestBody.create(mediaType, "{\n  \"foo\": \"bar\"\n}")
val request = Request.Builder()
  .url("http://mockbin.com/har")
  .post(body)
  .addHeader("content-type", "application/json")
  .build()

val response = client.newCall(request).execute()