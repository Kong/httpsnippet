HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://mockbin.com/har"))
    .header("content-type", "multipart/form-data; boundary=---011000010111000001101001")
    .method("POST", HttpRequest.BodyPublishers.ofString("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"hello.txt\"\r\nContent-Type: text/plain\r\n\r\n\r\n-----011000010111000001101001--\r\n"))
    .build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
