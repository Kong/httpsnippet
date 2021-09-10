OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")
  .get()
  .build();

Response response = client.newCall(request).execute();
