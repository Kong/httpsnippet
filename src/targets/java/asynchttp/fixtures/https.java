AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "https://mockbin.com/har")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
