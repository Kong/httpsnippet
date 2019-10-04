var client = new HttpClient(new HttpClientHandler { UseCookies = false });
var request = new HttpRequestMessage
{
    Method = HttpMethod.Post,
    RequestUri = new Uri("http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value"),
    Headers =
    {
        { "cookie", "foo=bar; bar=baz" },
        { "accept", "application/json" },
    },
    Content = new FormUrlEncodedContent(new Dictionary<string, string>
    {
        { "foo", "bar" },
    }),
};
using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
    Console.WriteLine(body);
}
