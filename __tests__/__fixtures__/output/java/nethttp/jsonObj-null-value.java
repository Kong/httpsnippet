HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://httpbin.org/anything"))
    .header("content-type", "application/json")
    .method("POST", HttpRequest.BodyPublishers.ofString("{\"foo\":null}"))
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
