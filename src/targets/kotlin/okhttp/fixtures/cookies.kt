val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/cookies")
  .get()
  .addHeader("cookie", "foo=bar; bar=baz")
  .build()

val response = client.newCall(request).execute()