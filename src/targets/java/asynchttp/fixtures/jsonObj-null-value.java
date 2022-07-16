AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "https://httpbin.org/anything")
  .setHeader("content-type", "application/json")
  .setBody("{\"foo\":null}")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();