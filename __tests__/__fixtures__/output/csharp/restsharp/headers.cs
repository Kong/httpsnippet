var client = new RestClient("https://httpbin.org/headers");
var request = new RestRequest(Method.GET);
request.AddHeader("accept", "text/json");
request.AddHeader("x-foo", "Bar");
IRestResponse response = client.Execute(request);
