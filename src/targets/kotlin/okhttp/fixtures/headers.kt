val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/headers")
  .get()
  .addHeader("accept", "application/json")
  .addHeader("x-foo", "Bar")
  .addHeader("x-bar", "Foo")
  .addHeader("quoted-value", "\"quoted\" 'string'")
  .build()

val response = client.newCall(request).execute()