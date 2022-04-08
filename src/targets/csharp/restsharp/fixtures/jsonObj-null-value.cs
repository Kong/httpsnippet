var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\"foo\":null}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);