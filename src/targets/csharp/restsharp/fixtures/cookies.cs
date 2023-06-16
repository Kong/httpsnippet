using RestSharp;


var options = new RestClientOptions("https://httpbin.org/cookies");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddCookie("foo", "bar", "/cookies", "httpbin.org");
request.AddCookie("bar", "baz", "/cookies", "httpbin.org");
var response = await client.GetAsync(request);

Console.WriteLine("{0}", response.Content);