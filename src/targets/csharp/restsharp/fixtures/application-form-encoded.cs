var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddParameter("foo", "bar");
request.AddParameter("hello", "world");
var response = await client.PostAsync(request); 