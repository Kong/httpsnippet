AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepareGet("https://mockbin.com/har")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
