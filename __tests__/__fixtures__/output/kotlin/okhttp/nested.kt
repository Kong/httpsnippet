val client = OkHttpClient()

val request = Request.Builder()
  .url("https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")
  .get()
  .build()

val response = client.newCall(request).execute()
