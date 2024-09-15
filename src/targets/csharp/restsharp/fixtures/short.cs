var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest("", Method.Get);
var response = client.Execute(request);