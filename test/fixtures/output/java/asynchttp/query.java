AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepareGet("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
