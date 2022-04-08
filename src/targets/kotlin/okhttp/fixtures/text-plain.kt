val client = OkHttpClient()

val mediaType = MediaType.parse("text/plain")
val body = RequestBody.create(mediaType, "Hello World")
val request = Request.Builder()
  .url("http://mockbin.com/har")
  .post(body)
  .addHeader("content-type", "text/plain")
  .build()

val response = client.newCall(request).execute()