val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")
  .get()
  .build()

val response = client.newCall(request).execute()