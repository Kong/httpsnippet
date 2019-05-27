using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Snippet
{
    static HttpClient client = new HttpClient(new HttpClientHandler { UseCookies = false });

    static async Task MainAsync()
    {
        var request = new HttpRequestMessage(HttpMethod.Post, "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value");
        request.Headers.Add("cookie", "foo=bar; bar=baz");
        request.Headers.Add("accept", "application/json");
        request.Content = new StringContent("foo=bar",
            Encoding.UTF8, "application/x-www-form-urlencoded");

        var response = await client.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);
    }

    static void Main(string[] args)
    {
        MainAsync().Wait();
    }
}
