var options = new RestClientOptions("http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value");
var client = new RestClient(options);
var request = new RestRequest("");
var response = await client.GetAsync(request); 