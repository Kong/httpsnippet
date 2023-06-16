var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("content-type", "text/plain");
request.AddJsonBody("Hello World", false);
var response = await client.PostAsync(request);