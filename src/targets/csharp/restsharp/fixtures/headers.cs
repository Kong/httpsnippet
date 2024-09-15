var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest("", Method.Get);
request.AddHeader("accept", "application/json");
request.AddHeader("x-foo", "Bar");
request.AddHeader("quoted-value", "\"quoted\" 'string'");
var response = client.Execute(request);