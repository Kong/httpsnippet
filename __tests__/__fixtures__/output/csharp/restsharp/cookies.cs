var client = new RestClient("https://httpbin.org/cookies");
var request = new RestRequest(Method.GET);
request.AddCookie("foo", "bar");
request.AddCookie("bar", "baz");
IRestResponse response = client.Execute(request);
