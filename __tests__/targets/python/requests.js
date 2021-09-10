module.exports = function (HTTPSnippet) {
  test("should support query parameters provided in HAR's url", function () {
    const har = {
      method: 'GET',
      url: 'https://httpbin.org/anything?param=value',
    };

    const result = new HTTPSnippet(har).convert('python', 'requests', { showBoilerplate: false });

    expect(result).toBe(`import requests

url = "https://httpbin.org/anything"

querystring = {"param":"value"}

response = requests.request("GET", url, params=querystring)

print(response.text)`);
  });
};
