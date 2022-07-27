OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("http://mockbin.com/har")
  .get()
  .addHeader("accept", "application/json")
  .addHeader("x-foo", "Bar")
  .addHeader("quoted-value", "\"quoted\" 'string'")
  .build();

Response response = client.newCall(request).execute();