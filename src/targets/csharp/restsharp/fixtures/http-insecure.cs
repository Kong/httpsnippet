var client = new RestClient("http://httpbin.org/anything");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);