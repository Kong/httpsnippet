val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har")
  .get()
  .addHeader("accept", "application/json")
  .addHeader("x-foo", "Bar")
  .addHeader("quoted-value", "\"quoted\" 'string'")
  .build()

val response = client.newCall(request).execute()