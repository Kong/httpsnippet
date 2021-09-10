val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/anything")
  .get()
  .build()

val response = client.newCall(request).execute()
