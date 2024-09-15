var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest("", Method.Post);
request.AddHeader("content-type", "text/plain");
request.AddParameter("text/plain", "Hello World", ParameterType.RequestBody);
var response = client.Execute(request);