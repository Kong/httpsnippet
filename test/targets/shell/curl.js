'use strict'

require('should')

module.exports = function (HTTPSnippet, fixtures) {
  it('should use short options', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      short: true,
      indent: false
    })

    result.should.be.a.String()
    result.should.eql("curl -X POST 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' -b 'foo=bar; bar=baz' -d foo=bar")
  })

  it('should use binary option', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      short: true,
      indent: false,
      binary: true
    })

    result.should.be.a.String()
    result.should.eql("curl -X POST 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' -H 'accept: application/json' -H 'content-type: application/x-www-form-urlencoded' -b 'foo=bar; bar=baz' --data-binary foo=bar")
  })

  it('should use short globoff option', function () {
    const result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      short: true,
      indent: false,
      globOff: true
    })

    result.should.be.a.String()
    result.should.eql("curl -X GET -g 'http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value'")
  })

  it('should use long globoff option', function () {
    const result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      indent: false,
      globOff: true
    })

    result.should.be.a.String()
    result.should.eql("curl --request GET --globoff --url 'http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value'")
  })

  it('should not de-glob when globoff is false', function () {
    const result = new HTTPSnippet(fixtures.requests.nested).convert('shell', 'curl', {
      indent: false,
      globOff: false
    })

    result.should.be.a.String()
    result.should.eql("curl --request GET --url 'http://mockbin.com/har?foo%5Bbar%5D=baz%2Czap&fiz=buz&key=value'")
  })

  it('should use --http1.0 for HTTP/1.0', function () {
    const result = new HTTPSnippet(fixtures.curl.http1).convert('shell', 'curl', {
      indent: false
    })

    result.should.be.a.String()
    result.should.eql('curl --request GET --url http://mockbin.com/request --http1.0')
  })

  describe('`harIsAlreadyEncoded` option', () => {
    it('should not double-encode already encoded data', function () {
      const har = {
        log: {
          entries: [
            {
              request: {
                cookies: [
                  { name: 'user', value: encodeURIComponent('abc^') }
                ],
                headers: [],
                headersSize: 0,
                queryString: [
                  { name: 'stringPound', value: encodeURIComponent('somethign&nothing=true') },
                  { name: 'stringHash', value: encodeURIComponent('hash#data') },
                  { name: 'stringArray', value: encodeURIComponent('where[4]=10') },
                  { name: 'stringWeird', value: encodeURIComponent('properties["$email"] == "testing"') },
                  { name: 'array', value: encodeURIComponent('something&nothing=true') },
                  { name: 'array', value: encodeURIComponent('nothing&something=false') },
                  { name: 'array', value: encodeURIComponent('another item') }
                ],
                bodySize: 0,
                method: 'POST',
                url: 'https://httpbin.org/anything',
                httpVersion: 'HTTP/1.1'
              }
            }
          ]
        }
      }

      const result = new HTTPSnippet(har, { harIsAlreadyEncoded: true }).convert('shell', 'curl')

      result.should.be.a.String()
      result.replace(/\\\n/g, '').should.eql("curl --request POST   --url 'https://httpbin.org/anything?stringPound=somethign%26nothing%3Dtrue&stringHash=hash%23data&stringArray=where%5B4%5D%3D10&stringWeird=properties%5B%22%24email%22%5D%20%3D%3D%20%22testing%22&array=something%26nothing%3Dtrue&array=nothing%26something%3Dfalse&array=another%20item'   --cookie user=abc%5E")
    })

    it('should escape brackets in query strings when `harIsAlreadyEncoded` is `true` and `escapeBrackets` is `true`', function () {
      const har = {
        method: 'GET',
        url: 'http://mockbin.com/har',
        httpVersion: 'HTTP/1.1',
        queryString: [
          {
            name: 'where',
            value: '[["$attributed_flow","=","FLOW_ID"]]'
          }
        ]
      }

      const result = new HTTPSnippet(har, { harIsAlreadyEncoded: true }).convert('shell', 'curl', {
        escapeBrackets: true
      })

      result.should.be.a.String()
      result.replace(/\\\n/g, '').should.eql("curl --request GET   --url 'http://mockbin.com/har?where=\\[\\[\"$attributed_flow\",\"=\",\"FLOW_ID\"\\]\\]'")
    })
  })

  it('should use custom indentation', function () {
    const result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'curl', {
      indent: '@'
    })

    result.should.be.a.String()
    result.replace(/\\\n/g, '').should.eql("curl --request POST @--url 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value' @--header 'accept: application/json' @--header 'content-type: application/x-www-form-urlencoded' @--cookie 'foo=bar; bar=baz' @--data foo=bar")
  })

  it('should send JSON-encoded data with single quotes within a HEREDOC', function () {
    const result = new HTTPSnippet(fixtures.curl['json-with-singlequotes']).convert('shell', 'curl')

    result.should.be.a.String()
    result.replace(/\\\n/g, '').replace(/\n/g, '').should.eql("curl --request POST   --url http://mockbin.com/har   --header 'content-type: application/json'   --data @- <<EOF{  \"number\": 1,  \"string\": \"f'oo\"}EOF")
  })

  it('should keep JSON payloads that are smaller than 20 characters on one line', function () {
    const result = new HTTPSnippet(fixtures.curl['jsonObj-short']).convert('shell', 'curl')

    result.should.be.a.String()
    result.replace(/\\\n/g, '').replace(/\n/g, '').should.eql("curl --request POST   --url http://mockbin.com/har   --header 'content-type: application/json'   --data '{\"foo\": \"bar\"}'")
  })
}
