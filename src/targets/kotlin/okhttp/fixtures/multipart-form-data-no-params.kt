val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har")
  .post(null)
  .addHeader("Content-Type", "multipart/form-data")
  .build()

val response = client.newCall(request).execute()