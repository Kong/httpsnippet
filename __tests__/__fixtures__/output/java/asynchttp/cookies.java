AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "https://httpbin.org/cookies")
  .setHeader("cookie", "foo=bar; bar=baz")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
