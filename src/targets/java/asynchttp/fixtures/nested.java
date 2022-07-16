AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();