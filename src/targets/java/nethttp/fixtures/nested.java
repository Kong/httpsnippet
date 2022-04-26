HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value"))
    .method("GET", HttpRequest.BodyPublishers.noBody())
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());