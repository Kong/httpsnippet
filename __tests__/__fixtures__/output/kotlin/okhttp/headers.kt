val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/headers")
  .get()
  .addHeader("accept", "text/json")
  .addHeader("x-foo", "Bar")
  .build()

val response = client.newCall(request).execute()
