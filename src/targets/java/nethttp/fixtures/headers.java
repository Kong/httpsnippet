HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://httpbin.org/headers"))
    .header("accept", "application/json")
    .header("x-foo", "Bar")
    .header("x-bar", "Foo")
    .method("GET", HttpRequest.BodyPublishers.noBody())
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());