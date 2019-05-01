/* global it */

'use strict'

require('should')

module.exports = function (HTTPSnippet) {
  it('should support query parameters provided in HAR\'s url', function () {
    var result = new HTTPSnippet({ 'method': 'GET', 'url': 'http://mockbin.com/har?param=value' }).convert('python', 'requests', {
      showBoilerplate: false
    })

    result.should.be.a.String()
    result.should.eql('import requests\n\nurl = "http://mockbin.com/har"\n\nquerystring = {"param":"value"}\n\nresponse = requests.request("GET", url, params=querystring)\n\nprint(response.text)')
  })
}
