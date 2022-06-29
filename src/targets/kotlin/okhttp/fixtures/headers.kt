val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har")
  .get()
  .addHeader("accept", "application/json")
  .addHeader("x-foo", "Bar")
  .addHeader("x-bar", "Foo")
  .build()

val response = client.newCall(request).execute()