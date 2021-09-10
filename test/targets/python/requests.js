module.exports = function (HTTPSnippet) {
  test("should support query parameters provided in HAR's url", function () {
    const result = new HTTPSnippet({ method: 'GET', url: 'http://mockbin.com/har?param=value' }).convert(
      'python',
      'requests',
      {
        showBoilerplate: false,
      }
    );

    expect(result).toBe(`import requests

url = "http://mockbin.com/har"

querystring = {"param":"value"}

response = requests.request("GET", url, params=querystring)

print(response.text)`);
  });
};
