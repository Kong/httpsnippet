var client = new HttpClient();
var request = new HttpRequestMessage
{
    Method = new HttpMethod("PROPFIND"),
    RequestUri = new Uri("https://httpbin.org/anything"),
};
using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
    Console.WriteLine(body);
}
