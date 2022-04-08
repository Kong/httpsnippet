AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("POST", "http://mockbin.com/har")
  .setHeader("Content-Type", "multipart/form-data; boundary=---011000010111000001101001")
  .setBody("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();