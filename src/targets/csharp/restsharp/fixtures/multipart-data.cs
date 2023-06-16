var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AlwaysMultipartFormData = true;
request.FormBoundary = "---011000010111000001101001";
request.AddFile("foo", "hello.txt");
request.AddParameter("bar", "Bonjour le monde");
var response = await client.PostAsync(request); 