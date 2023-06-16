var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddJsonBody("{\n  \"foo\": \"bar\"\n}", false);
var response = await client.PostAsync(request); 