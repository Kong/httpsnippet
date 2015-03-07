'use strict';

var fixtures = require('../fixtures');
var HTTPSnippet = require('../../src');
var should = require('should');

describe('cURL', function () {
  it('should convert simple request to cURL command', function (done) {
    var result = new HTTPSnippet(fixtures.simple).convert('curl', {
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('curl --request POST --url "http://mockbin.com/request?foo=bar" --header "Content-Type: application/json" --cookie "bar=baz" --data "{\\"foo\\": \\"bar\\"}"');

    done();
  });

  it('should use short options', function (done) {
    var result = new HTTPSnippet(fixtures.simple).convert('curl', {
      short: true,
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('curl -X POST "http://mockbin.com/request?foo=bar" -H "Content-Type: application/json" -b "bar=baz" -d "{\\"foo\\": \\"bar\\"}"');

    done();
  });

  it('should use --http1.0 for HTTP/1.0', function (done) {
    var result = new HTTPSnippet(fixtures.http1).convert('curl', {
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('curl --request GET --url "http://mockbin.com/request" --http1.0');

    done();
  });

  it('should use custom indentation', function (done) {
    var result = new HTTPSnippet(fixtures.simple).convert('curl', {
      indent: '@'
    });

    result.should.be.a.String;
    result.replace(/\\\n/g, '').should.eql('curl --request POST @--url "http://mockbin.com/request?foo=bar" @--header "Content-Type: application/json" @--cookie "bar=baz" @--data "{\\"foo\\": \\"bar\\"}"');

    done();
  });
});
