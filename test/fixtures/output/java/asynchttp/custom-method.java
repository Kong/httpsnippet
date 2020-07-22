AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("PROPFIND", "http://mockbin.com/har")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
