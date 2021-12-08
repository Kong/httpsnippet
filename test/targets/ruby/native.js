'use strict'

module.exports = function (HTTPSnippet, fixtures) {
  it('should support insecureSkipVerify', function () {
    const result = new HTTPSnippet(fixtures.requests.https).convert('ruby', 'native', {
      insecureSkipVerify: true
    })

    result.should.be.a.String()
    result.should.eql(`require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://mockbin.com/har")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body`)
  })
}
