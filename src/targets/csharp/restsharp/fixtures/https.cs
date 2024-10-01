var client = new RestClient("https://mockbin.com/har");
var request = new RestRequest("", Method.Get);
var response = client.Execute(request);