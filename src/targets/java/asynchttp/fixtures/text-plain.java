AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "http://mockbin.com/har")
  .setHeader("content-type", "text/plain")
  .setBody("Hello World")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
