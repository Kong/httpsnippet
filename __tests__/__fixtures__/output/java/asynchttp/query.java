AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
