var client = new RestClient("https://httpbin.org/anything");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\n  \"foo\": \"bar\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);