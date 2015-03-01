'use strict';

var fixtures = require('../fixtures');
var HTTPSnippet = require('../../src');

require('should');

describe('cURL', function () {
  it('should convert simple request to cURL command', function (done) {
    var result = new HTTPSnippet(fixtures.simple).curl({
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('curl --request POST --url "http://httpconsole.com/debug?foo=bar" --cookie "bar=baz" --header "Content-Type: application/json" --data "{\\"foo\\": \\"bar\\"}"');

    done();
  });

  it('should use short options', function (done) {
    var result = new HTTPSnippet(fixtures.simple).curl({
      short: true,
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('curl -X POST "http://httpconsole.com/debug?foo=bar" -b "bar=baz" -H "Content-Type: application/json" -d "{\\"foo\\": \\"bar\\"}"');

    done();
  });

  it('should use --http1.0 for HTTP/1.0', function (done) {
    var result = new HTTPSnippet(fixtures.http1).curl({
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('curl --request GET --url "http://httpconsole.com/debug" --http1.0');

    done();
  });

  it('should use custom indentation', function (done) {
    var result = new HTTPSnippet(fixtures.simple).curl({
      indent: '@'
    });

    result.should.be.a.String;
    result.replace(/\\\n/g, '').should.eql('curl --request POST @--url "http://httpconsole.com/debug?foo=bar" @--cookie "bar=baz" @--header "Content-Type: application/json" @--data "{\\"foo\\": \\"bar\\"}"');

    done();
  });
});
