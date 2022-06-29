val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har")
  .method("PROPFIND", null)
  .build()

val response = client.newCall(request).execute()