val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/anything")
  .post(null)
  .addHeader("content-type", "application/json")
  .build()

val response = client.newCall(request).execute()