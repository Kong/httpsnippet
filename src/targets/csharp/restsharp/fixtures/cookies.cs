var client = new RestClient("http://mockbin.com/har");
var request = new RestRequest("", Method.Post);
request.AddCookie("foo", "bar");
request.AddCookie("bar", "baz");
var response = client.Execute(request);