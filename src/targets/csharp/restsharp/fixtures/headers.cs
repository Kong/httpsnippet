var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest(Method.GET);
request.AddHeader("accept", "application/json");
request.AddHeader("x-foo", "Bar");
IRestResponse response = client.Execute(request);