OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
RequestBody body = RequestBody.create(mediaType, "foo=bar");
Request request = new Request.Builder()
  .url("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")
  .post(body)
  .addHeader("cookie", "foo=bar; bar=baz")
  .addHeader("accept", "application/json")
  .addHeader("content-type", "application/x-www-form-urlencoded")
  .build();

Response response = client.newCall(request).execute();