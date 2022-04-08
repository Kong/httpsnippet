val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har")
  .get()
  .build()

val response = client.newCall(request).execute()