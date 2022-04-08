val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har")
  .post(null)
  .addHeader("cookie", "foo=bar; bar=baz")
  .build()

val response = client.newCall(request).execute()