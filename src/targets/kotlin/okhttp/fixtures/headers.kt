val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/headers")
  .get()
  .addHeader("accept", "application/json")
  .addHeader("x-foo", "Bar")
  .addHeader("x-bar", "Foo")
  .build()

val response = client.newCall(request).execute()