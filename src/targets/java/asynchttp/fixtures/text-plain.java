AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "https://httpbin.org/anything")
  .setHeader("content-type", "text/plain")
  .setBody("Hello World")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();