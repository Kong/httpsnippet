OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("http://mockbin.com/har?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00")
  .get()
  .build();

Response response = client.newCall(request).execute();
