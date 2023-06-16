using RestSharp;


var options = new RestClientOptions("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value");
var client = new RestClient(options);
var request = new RestRequest("");
var response = await client.GetAsync(request);

Console.WriteLine("{0}", response.Content);