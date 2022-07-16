HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://httpbin.org/cookies"))
    .header("cookie", "foo=bar; bar=baz")
    .method("GET", HttpRequest.BodyPublishers.noBody())
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());