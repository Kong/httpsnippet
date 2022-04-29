val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/anything")
  .post(null)
  .addHeader("Content-Type", "multipart/form-data")
  .build()

val response = client.newCall(request).execute()