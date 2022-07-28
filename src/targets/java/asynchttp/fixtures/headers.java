AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "http://mockbin.com/har")
  .setHeader("accept", "application/json")
  .setHeader("x-foo", "Bar")
  .setHeader("quoted-value", "\"quoted\" 'string'")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();