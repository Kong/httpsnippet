OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")
  .get()
  .build();

Response response = client.newCall(request).execute();