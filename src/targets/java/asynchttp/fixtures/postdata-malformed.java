AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "https://httpbin.org/anything")
  .setHeader("content-type", "application/json")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();