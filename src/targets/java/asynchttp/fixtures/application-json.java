AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "http://mockbin.com/har")
  .setHeader("content-type", "application/json")
  .setBody("{\"number\":1,\"string\":\"f\\\"oo\",\"arr\":[1,2,3],\"nested\":{\"a\":\"b\"},\"arr_mix\":[1,\"a\",{\"arr_mix_nested\":{}}],\"boolean\":false}")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();
