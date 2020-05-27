AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepareGet("http://mockbin.com/har")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
