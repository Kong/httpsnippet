using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Snippet
{
    static HttpClient client = new HttpClient();

    static async Task MainAsync()
    {
        var request = new HttpRequestMessage(HttpMethod.Get, "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value");

        var response = await client.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);
    }

    static void Main(string[] args)
    {
        MainAsync().Wait();
    }
}
