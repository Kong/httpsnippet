val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")
  .get()
  .build()

val response = client.newCall(request).execute()