AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "http://httpbin.org/anything")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
