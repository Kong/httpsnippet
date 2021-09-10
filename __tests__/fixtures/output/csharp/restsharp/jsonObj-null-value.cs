var client = new RestClient("https://httpbin.org/anything");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\"foo\":null}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
