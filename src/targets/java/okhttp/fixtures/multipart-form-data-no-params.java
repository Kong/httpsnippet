OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://httpbin.org/anything")
  .post(null)
  .addHeader("Content-Type", "multipart/form-data")
  .build();

Response response = client.newCall(request).execute();