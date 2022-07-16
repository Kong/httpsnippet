OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("http://httpbin.org/anything")
  .get()
  .build();

Response response = client.newCall(request).execute();