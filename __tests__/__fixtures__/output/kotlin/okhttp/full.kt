val client = OkHttpClient()

val mediaType = MediaType.parse("application/x-www-form-urlencoded")
val body = RequestBody.create(mediaType, "foo=bar")
val request = Request.Builder()
  .url("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")
  .post(body)
  .addHeader("cookie", "foo=bar; bar=baz")
  .addHeader("accept", "application/json")
  .addHeader("content-type", "application/x-www-form-urlencoded")
  .build()

val response = client.newCall(request).execute()
