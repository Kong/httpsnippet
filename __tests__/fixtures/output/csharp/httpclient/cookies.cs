var clientHandler = new HttpClientHandler
{
    UseCookies = false,
};
var client = new HttpClient(clientHandler);
var request = new HttpRequestMessage
{
    Method = HttpMethod.Get,
    RequestUri = new Uri("https://httpbin.org/cookies"),
    Headers =
    {
        { "cookie", "foo=bar; bar=baz" },
    },
};
using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
    Console.WriteLine(body);
}
