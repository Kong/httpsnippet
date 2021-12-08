'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should support insecureSkipVerify', function () {
    const result = new HTTPSnippet(fixtures.requests.https).convert('python', 'python3', {
      insecureSkipVerify: true
    })

    result.should.be.a.String()
    result.should.eql(`import http.client
import ssl

conn = http.client.HTTPSConnection("mockbin.com", context = ssl._create_unverified_context())

conn.request("GET", "/har")

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))`)
  })
}
