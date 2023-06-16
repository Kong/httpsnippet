var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("Content-Type", "multipart/form-data; boundary=---011000010111000001101001");
request.AddJsonBody("-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"foo\"\r\n\r\nbar\r\n-----011000010111000001101001--\r\n", false);
var response = await client.PostAsync(request);