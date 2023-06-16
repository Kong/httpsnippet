using System.Net.Http.Headers;
var client = new HttpClient();
var request = new HttpRequestMessage
{
    Method = HttpMethod.Get,
    RequestUri = new Uri("https://httpbin.org/headers"),
    Headers =
    {
        { "accept", "application/json" },
        { "x-foo", "Bar" },
        { "x-bar", "Foo" },
        { "quoted-value", "\"quoted\" 'string'" },
    },
};
using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
    Console.WriteLine(body);
}