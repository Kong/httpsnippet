AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")
  .setHeader("cookie", "foo=bar; bar=baz")
  .setHeader("accept", "application/json")
  .setHeader("content-type", "application/x-www-form-urlencoded")
  .setBody("foo=bar")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
