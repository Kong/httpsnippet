val client = OkHttpClient()

val request = Request.Builder()
  .url("http://httpbin.org/anything")
  .get()
  .build()

val response = client.newCall(request).execute()