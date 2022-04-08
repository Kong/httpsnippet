val client = OkHttpClient()

val mediaType = MediaType.parse("application/json")
val body = RequestBody.create(mediaType, "{\"number\":1,\"string\":\"f\\\"oo\",\"arr\":[1,2,3],\"nested\":{\"a\":\"b\"},\"arr_mix\":[1,\"a\",{\"arr_mix_nested\":{}}],\"boolean\":false}")
val request = Request.Builder()
  .url("http://mockbin.com/har")
  .post(body)
  .addHeader("content-type", "application/json")
  .build()

val response = client.newCall(request).execute()