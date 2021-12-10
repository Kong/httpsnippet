AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "https://httpbin.org/anything")
  .setHeader("Content-Type", "multipart/form-data")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
