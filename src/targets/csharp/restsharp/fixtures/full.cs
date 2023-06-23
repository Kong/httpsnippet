using RestSharp;


var options = new RestClientOptions("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("accept", "application/json");
request.AddCookie("foo", "bar", "/anything", "httpbin.org");
request.AddCookie("bar", "baz", "/anything", "httpbin.org");
request.AddParameter("foo", "bar");
var response = await client.PostAsync(request);

Console.WriteLine("{0}", response.Content);
