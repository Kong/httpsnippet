OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("http://mockbin.com/har")
  .post(null)
  .addHeader("Content-Type", "multipart/form-data")
  .build();

Response response = client.newCall(request).execute();