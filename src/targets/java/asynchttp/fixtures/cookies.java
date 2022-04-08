AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "http://mockbin.com/har")
  .setHeader("cookie", "foo=bar; bar=baz")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
