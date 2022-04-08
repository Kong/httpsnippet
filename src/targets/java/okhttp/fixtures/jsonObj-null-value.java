OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\"foo\":null}");
Request request = new Request.Builder()
  .url("http://mockbin.com/har")
  .post(body)
  .addHeader("content-type", "application/json")
  .build();

Response response = client.newCall(request).execute();