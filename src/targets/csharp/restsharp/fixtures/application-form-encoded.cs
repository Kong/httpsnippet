var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("content-type", "application/x-www-form-urlencoded");
request.AddJsonBody("foo=bar&hello=world", false);
var response = await client.PostAsync(request);