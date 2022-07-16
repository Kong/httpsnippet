HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value"))
    .method("GET", HttpRequest.BodyPublishers.noBody())
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());