AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("PROPFIND", "https://httpbin.org/anything")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();