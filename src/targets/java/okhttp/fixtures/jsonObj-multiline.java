OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\n  \"foo\": \"bar\"\n}");
Request request = new Request.Builder()
  .url("https://httpbin.org/anything")
  .post(body)
  .addHeader("content-type", "application/json")
  .build();

Response response = client.newCall(request).execute();