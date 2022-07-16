var client = new RestClient("https://httpbin.org/anything");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "text/plain");
request.AddParameter("text/plain", "Hello World", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);