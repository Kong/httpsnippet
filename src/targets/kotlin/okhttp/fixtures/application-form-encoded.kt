val client = OkHttpClient()

val mediaType = MediaType.parse("application/x-www-form-urlencoded")
val body = RequestBody.create(mediaType, "foo=bar&hello=world")
val request = Request.Builder()
  .url("http://mockbin.com/har")
  .post(body)
  .addHeader("content-type", "application/x-www-form-urlencoded")
  .build()

val response = client.newCall(request).execute()