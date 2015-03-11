/* global it */

'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should ask for verbose output', function () {
    var result = new HTTPSnippet(fixtures.requests.short).convert('httpie', {
      indent: false,
      verbose: true
    })

    result.should.be.a.String
    result.should.eql('http --verbose GET http://mockbin.com/har')
  })

  it('should add flags', function () {
    var result = new HTTPSnippet(fixtures.requests.short).convert('httpie', {
      indent: false,
      cert: 'foo',
      verbose: true
    })

    result.should.be.a.String
    result.should.eql('http --verbose --cert=foo GET http://mockbin.com/har')
  })

  it('should use custom indentation', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('httpie', {
      indent: '@'
    })

    result.should.be.a.String
    result.replace(/\\\n/g, '').should.eql('echo "foo=bar" |  @http POST http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value @accept:application/json @content-type:application/x-www-form-urlencoded @cookie:foo=bar; bar=baz')
  })

  it('should use queryString parameters', function () {
    var result = new HTTPSnippet(fixtures.requests.query).convert('httpie', {
      indent: false,
      queryParams: true
    })

    result.should.be.a.String
    result.replace(/\\\n/g, '').should.eql('http GET http://mockbin.com/har foo==bar foo==baz baz==abc key==value')
  })
}
