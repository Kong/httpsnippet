var options = new RestClientOptions("http://mockbin.com/har");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("accept", "application/json");
request.AddHeader("x-foo", "Bar");
request.AddHeader("quoted-value", "\"quoted\" 'string'");
var response = await client.GetAsync(request); 