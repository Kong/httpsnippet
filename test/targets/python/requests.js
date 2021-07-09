'use strict'

require('should')

module.exports = function (HTTPSnippet) {
  it('should support query parameters provided in HAR\'s url', function () {
    const result = new HTTPSnippet({ method: 'GET', url: 'http://mockbin.com/har?param=value' }).convert('python', 'requests', {
      showBoilerplate: false
    })

    result.should.be.a.String()
    result.should.eql(`import requests

url = "http://mockbin.com/har"

querystring = { "param": "value" }

response = requests.request("GET", url, params=querystring)

print(response.text)`)
  })
}
