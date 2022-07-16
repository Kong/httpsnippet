var client = new HttpClient();
var request = new HttpRequestMessage
{
    Method = HttpMethod.Post,
    RequestUri = new Uri("https://httpbin.org/anything"),
    Content = new FormUrlEncodedContent(new Dictionary<string, string>
    {
        { "foo", "bar" },
        { "hello", "world" },
    }),
};
using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
    Console.WriteLine(body);
}