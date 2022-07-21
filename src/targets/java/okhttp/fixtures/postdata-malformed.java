OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://httpbin.org/anything")
  .post(null)
  .addHeader("content-type", "application/json")
  .build();

Response response = client.newCall(request).execute();