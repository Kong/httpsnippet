var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest("", Method.Post);
request.AddHeader("Content-Type", "multipart/form-data");
var response = client.Execute(request);