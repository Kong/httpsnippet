var options = new RestClientOptions("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value");
var client = new RestClient(options);
var request = new RestRequest("");
var response = await client.GetAsync(request); 