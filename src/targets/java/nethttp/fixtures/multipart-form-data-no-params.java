HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://mockbin.com/har"))
    .header("Content-Type", "multipart/form-data")
    .method("POST", HttpRequest.BodyPublishers.noBody())
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());