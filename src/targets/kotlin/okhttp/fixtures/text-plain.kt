val client = OkHttpClient()

val mediaType = MediaType.parse("text/plain")
val body = RequestBody.create(mediaType, "Hello World")
val request = Request.Builder()
  .url("https://httpbin.org/anything")
  .post(body)
  .addHeader("content-type", "text/plain")
  .build()

val response = client.newCall(request).execute()