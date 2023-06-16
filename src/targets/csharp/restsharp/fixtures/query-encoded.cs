using RestSharp;


var options = new RestClientOptions("https://httpbin.org/anything?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00");
var client = new RestClient(options);
var request = new RestRequest("");
var response = await client.GetAsync(request);

Console.WriteLine("{0}", response.Content);