OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://httpbin.org/cookies")
  .get()
  .addHeader("cookie", "foo=bar; bar=baz")
  .build();

Response response = client.newCall(request).execute();
