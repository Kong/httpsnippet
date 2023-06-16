var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("content-type", "multipart/form-data; boundary=---011000010111000001101001");
request.AddJsonBody("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"; filename=\"hello.txt\"\r\nContent-Type: text/plain\r\n\r\nHello World\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"bar\"\r\n\r\nBonjour le monde\r\n-----011000010111000001101001--\r\n", false);
var response = await client.PostAsync(request);