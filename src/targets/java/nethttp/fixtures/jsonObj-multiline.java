HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://mockbin.com/har"))
    .header("content-type", "application/json")
    .method("POST", HttpRequest.BodyPublishers.ofString("{\n  \"foo\": \"bar\"\n}"))
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());