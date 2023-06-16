var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AlwaysMultipartFormData = true;
var response = await client.PostAsync(request); 