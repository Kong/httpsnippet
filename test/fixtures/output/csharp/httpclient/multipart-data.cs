var client = new HttpClient();
var request = new HttpRequestMessage
{
    Method = HttpMethod.Post,
    RequestUri = new Uri("http://mockbin.com/har"),
    Content = new MultipartFormDataContent
    {
        new StringContent("Hello World")
        {
            Headers =
            {
                ContentType = new MediaTypeHeaderValue("text/plain"),
                ContentDisposition = new ContentDispositionHeaderValue("form-data")
                {
                    Name = "foo",
                    FileName = "hello.txt",
                }
            }
        },
    },
};
using (var response = await client.SendAsync(request))
{
    response.EnsureSuccessStatusCode();
    var body = await response.Content.ReadAsStringAsync();
    Console.WriteLine(body);
}
