var client = new RestClient("https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);