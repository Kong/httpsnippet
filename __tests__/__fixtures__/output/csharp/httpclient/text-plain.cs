var client = new HttpClient();
var request = new HttpRequestMessage
{
    Method = HttpMethod.Post,
    RequestUri = new Uri("https://httpbin.org/anything"),
    Content = new StringContent("Hello World")
    {
        Headers =
        {
            ContentType = new MediaTypeHeaderValue("text/plain")
        }
    }
};
using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
    Console.WriteLine(body);
}