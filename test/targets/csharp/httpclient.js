/* global it */

'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should support false boilerplate option', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('csharp', 'httpclient', {
      showBoilerplate: false
    })

    result.should.be.a.String()
    result.should.eql(`
var client = new HttpClient(new HttpClientHandler { UseCookies = false });
var request = new HttpRequestMessage(HttpMethod.Post, "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value");
request.Headers.Add("cookie", "foo=bar; bar=baz");
request.Headers.Add("accept", "application/json");
request.Content = new StringContent("foo=bar",
    Encoding.UTF8, "application/x-www-form-urlencoded");

var response = await client.SendAsync(request);
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);
`.trim())
  })

  it('should support false printBody option', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('csharp', 'httpclient', {
      showBoilerplate: false,
      printBody: false
    })

    result.should.be.a.String()
    result.should.eql(`
var client = new HttpClient(new HttpClientHandler { UseCookies = false });
var request = new HttpRequestMessage(HttpMethod.Post, "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value");
request.Headers.Add("cookie", "foo=bar; bar=baz");
request.Headers.Add("accept", "application/json");
request.Content = new StringContent("foo=bar",
    Encoding.UTF8, "application/x-www-form-urlencoded");

var response = await client.SendAsync(request);
`.trim())
  })
}
