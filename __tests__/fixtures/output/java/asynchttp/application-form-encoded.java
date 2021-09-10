AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "https://httpbin.org/anything")
  .setHeader("content-type", "application/x-www-form-urlencoded")
  .setBody("foo=bar&hello=world")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
