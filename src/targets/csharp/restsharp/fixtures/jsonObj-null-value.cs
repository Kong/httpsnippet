var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("content-type", "application/json");
request.AddJsonBody("{\"foo\":null}", false);
var response = await client.PostAsync(request);