var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest("", Method.Post);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\"foo\":null}", ParameterType.RequestBody);
var response = client.Execute(request);