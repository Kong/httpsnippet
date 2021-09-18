'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should ask for verbose output', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'httpie', {
      indent: false,
      verbose: true
    })

    result.should.be.a.String()
    result.should.eql('http --verbose GET http://mockbin.com/har')
  })

  it('should use short flags', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'httpie', {
      body: true,
      cert: 'foo',
      headers: true,
      indent: false,
      pretty: 'x',
      print: 'y',
      short: true,
      style: 'z',
      timeout: 1,
      verbose: true,
      verify: 'v'
    })

    result.should.be.a.String()
    result.should.eql('http -h -b -v -p=y --verify=v --cert=foo --pretty=x --style=z --timeout=1 GET http://mockbin.com/har')
  })

  it('should use long flags', function () {
    const result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'httpie', {
      body: true,
      cert: 'foo',
      headers: true,
      indent: false,
      pretty: 'x',
      print: 'y',
      style: 'z',
      timeout: 1,
      verbose: true,
      verify: 'v'
    })

    result.should.be.a.String()
    result.should.eql('http --headers --body --verbose --print=y --verify=v --cert=foo --pretty=x --style=z --timeout=1 GET http://mockbin.com/har')
  })

  it('should use custom indentation', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'httpie', {
      indent: '@'
    })

    result.should.be.a.String()
    result.replace(/\\\n/g, '').should.eql("http --form POST 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' @accept:application/json @content-type:application/x-www-form-urlencoded @cookie:'foo=bar; bar=baz' @foo=bar")
  })

  it('should use queryString parameters', function () {
    const result = new HTTPSnippet(fixtures.requests.query).convert('shell', 'httpie', {
      indent: false,
      queryParams: true
    })

    result.should.be.a.String()
    result.replace(/\\\n/g, '').should.eql('http GET http://mockbin.com/har foo==bar foo==baz baz==abc key==value')
  })

  it('should build parameterized output of query string', function () {
    const result = new HTTPSnippet(fixtures.requests.query).convert('shell', 'httpie', {
      indent: false,
      queryParams: true
    })

    result.should.be.a.String()
    result.replace(/\\\n/g, '').should.eql('http GET http://mockbin.com/har foo==bar foo==baz baz==abc key==value')
  })

  it('should build parameterized output of post data', function () {
    const result = new HTTPSnippet(fixtures.requests['application-form-encoded']).convert('shell', 'httpie', {
      short: true,
      indent: false,
      queryParams: true
    })

    result.should.be.a.String()
    result.replace(/\\\n/g, '').should.eql('http -f POST http://mockbin.com/har content-type:application/x-www-form-urlencoded foo=bar hello=world')
  })
}
