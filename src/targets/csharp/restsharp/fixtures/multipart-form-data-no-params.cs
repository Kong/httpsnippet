using RestSharp;


var options = new RestClientOptions("https://httpbin.org/anything");
var client = new RestClient(options);
var request = new RestRequest("");
request.AlwaysMultipartFormData = true;
request.AddHeader("Content-Type", "multipart/form-data");
var response = await client.PostAsync(request);

Console.WriteLine("{0}", response.Content);
