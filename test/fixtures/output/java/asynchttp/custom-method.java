AsyncHttpClient client = new DefaultAsyncHttpClient();
client.preparePropfind("http://mockbin.com/har")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
