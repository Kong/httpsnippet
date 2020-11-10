/* global it */

'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should use short options', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      short: true,
      indent: false
    })

    result.should.be.a.String()
    result.should.eql("curl -X POST 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' -b 'foo=bar; bar=baz' -d foo=bar")
  })

  it('should use binary option', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      short: true,
      indent: false,
      binary: true
    })

    result.should.be.a.String()
    result.should.eql("curl -X POST 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' -b 'foo=bar; bar=baz' --data-binary foo=bar")
  })

  it('should use short globoff option', function () {
    var result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      short: true,
      indent: false,
      globOff: true
    })

    result.should.be.a.String()
    result.should.eql("curl -X GET -g 'http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value'")
  })

  it('should use long globoff option', function () {
    var result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      indent: false,
      globOff: true
    })

    result.should.be.a.String()
    result.should.eql("curl --request GET --globoff --url 'http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value'")
  })

  it('should not de-glob when globoff is false', function () {
    var result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      indent: false,
      globOff: false
    })

    result.should.be.a.String()
    result.should.eql("curl --request GET --url 'http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value'")
  })

  it('should use --http1.0 for HTTP/1.0', function () {
    var result = new HTTPSnippet(fixtures.curl.http1).convert('shell', 'curl', {
      indent: false
    })

    result.should.be.a.String()
    result.should.eql('curl --request GET --url http://mockbin.com/request --http1.0')
  })

  it('should use custom indentation', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      indent: '@'
    })

    result.should.be.a.String()
    result.replace(/\\\n/g, '').should.eql("curl --request POST @--url 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' @--header 'accept: application/json' @--header 'content-type: application/x-www-form-urlencoded' @--cookie 'foo=bar; bar=baz' @--data foo=bar")
  })
}
