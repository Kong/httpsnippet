var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
var response = await client.GetAsync(request);