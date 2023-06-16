var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AlwaysMultipartFormData = true;
request.FormBoundary = "---011000010111000001101001";
request.AddFile("foo", "test/fixtures/files/hello.txt");
var response = await client.PostAsync(request); 