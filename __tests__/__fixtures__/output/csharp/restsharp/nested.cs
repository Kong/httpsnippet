var client = new RestClient("https://httpbin.org/anything?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);
