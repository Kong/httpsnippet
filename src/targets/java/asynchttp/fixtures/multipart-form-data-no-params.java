AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "http://mockbin.com/har")
  .setHeader("Content-Type", "multipart/form-data")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();