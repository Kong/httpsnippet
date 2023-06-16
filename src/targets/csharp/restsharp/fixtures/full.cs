var options = new RestClientOptions("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("accept", "application/json");
request.AddHeader("content-type", "application/x-www-form-urlencoded");
request.AddCookie("foo", "bar", "/har", "mockbin.com");
request.AddCookie("bar", "baz", "/har", "mockbin.com");
request.AddJsonBody("foo=bar", false);
var response = await client.PostAsync(request);