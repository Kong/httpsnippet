AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "https://httpbin.org/headers")
  .setHeader("accept", "application/json")
  .setHeader("x-foo", "Bar")
  .setHeader("x-bar", "Foo")
  .setHeader("quoted-value", "\"quoted\" 'string'")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();