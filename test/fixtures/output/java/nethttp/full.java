HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"))
    .header("cookie", "foo=bar; bar=baz")
    .header("accept", "application/json")
    .header("content-type", "application/x-www-form-urlencoded")
    .method("POST", HttpRequest.BodyPublishers.ofString("foo=bar"))
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
