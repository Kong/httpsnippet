OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://httpbin.org/anything")
  .get()
  .build();

Response response = client.newCall(request).execute();