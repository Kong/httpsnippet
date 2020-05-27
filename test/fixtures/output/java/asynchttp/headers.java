AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepareGet("http://mockbin.com/har")
  .setHeader("accept", "application/json")
  .setHeader("x-foo", "Bar")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
