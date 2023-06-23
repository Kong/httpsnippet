using RestSharp;


var options = new RestClientOptions("https://httpbin.org/anything");
var client = new RestClient(options);
var request = new RestRequest("");
request.AlwaysMultipartFormData = true;
request.FormBoundary = "---011000010111000001101001";
request.AddFile("foo", "src/fixtures/files/hello.txt");
request.AddParameter("bar", "Bonjour le monde");
var response = await client.PostAsync(request);

Console.WriteLine("{0}", response.Content);
