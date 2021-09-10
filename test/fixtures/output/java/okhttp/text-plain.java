OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "Hello World");
Request request = new Request.Builder()
  .url("https://httpbin.org/anything")
  .post(body)
  .addHeader("content-type", "text/plain")
  .build();

Response response = client.newCall(request).execute();
