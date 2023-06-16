OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://httpbin.org/headers")
  .get()
  .addHeader("accept", "application/json")
  .addHeader("x-foo", "Bar")
  .addHeader("x-bar", "Foo")
  .addHeader("quoted-value", "\"quoted\" 'string'")
  .build();

Response response = client.newCall(request).execute();