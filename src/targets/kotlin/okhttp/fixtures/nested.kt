val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")
  .get()
  .build()

val response = client.newCall(request).execute()