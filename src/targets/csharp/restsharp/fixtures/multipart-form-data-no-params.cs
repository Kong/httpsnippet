var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("Content-Type", "multipart/form-data");
var response = await client.PostAsync(request);