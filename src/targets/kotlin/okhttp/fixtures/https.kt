val client = OkHttpClient()

val request = Request.Builder()
  .url("https://mockbin.com/har")
  .get()
  .build()

val response = client.newCall(request).execute()