using RestSharp;


var options = new RestClientOptions("https://httpbin.org/headers");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("accept", "application/json");
request.AddHeader("x-foo", "Bar");
request.AddHeader("x-bar", "Foo");
request.AddHeader("quoted-value", "\"quoted\" 'string'");
var response = await client.GetAsync(request);

Console.WriteLine("{0}", response.Content);