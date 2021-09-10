val client = OkHttpClient()

val mediaType = MediaType.parse("application/json")
val body = RequestBody.create(mediaType, "{\n  \"foo\": \"bar\"\n}")
val request = Request.Builder()
  .url("https://httpbin.org/anything")
  .post(body)
  .addHeader("content-type", "application/json")
  .build()

val response = client.newCall(request).execute()
