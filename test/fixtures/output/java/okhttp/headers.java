OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://httpbin.org/headers")
  .get()
  .addHeader("accept", "text/json")
  .addHeader("x-foo", "Bar")
  .build();

Response response = client.newCall(request).execute();
