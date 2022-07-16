val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/anything")
  .method("PROPFIND", null)
  .build()

val response = client.newCall(request).execute()