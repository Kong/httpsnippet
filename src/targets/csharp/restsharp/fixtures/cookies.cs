var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddCookie("foo", "bar", "/har", "mockbin.com");
request.AddCookie("bar", "baz", "/har", "mockbin.com");
var response = await client.PostAsync(request); 