val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/anything?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00")
  .get()
  .build()

val response = client.newCall(request).execute()