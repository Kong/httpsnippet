var client = new RestClient("https://httpbin.org/anything");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);
