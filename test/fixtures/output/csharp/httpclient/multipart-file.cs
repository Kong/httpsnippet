var client = new HttpClient();
var request = new HttpRequestMessage
{
    Method = HttpMethod.Post,
    RequestUri = new Uri("https://httpbin.org/anything"),
    Content = new MultipartFormDataContent
    {
        new StringContent("")
        {
            Headers =
            {
                ContentType = new MediaTypeHeaderValue("text/plain"),
                ContentDisposition = new ContentDispositionHeaderValue("form-data")
                {
                    Name = "foo",
                    FileName = "test/fixtures/files/hello.txt",
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
