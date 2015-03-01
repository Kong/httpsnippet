'use strict';

var fixtures = require('../fixtures');
var HTTPSnippet = require('../../src');
var should = require('should');

describe('HTTPie', function () {
  it('should convert simple request to HTTPie command', function (done) {
    var result = new HTTPSnippet(fixtures.simple).httpie({
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('echo "{\\"foo\\": \\"bar\\"}" |  http POST http://httpconsole.com/debug Content-Type:application/json Cookie:bar=baz');

    done();
  });

  it('should ask for verbose output', function (done) {
    var result = new HTTPSnippet(fixtures.simple).httpie({
      indent: false,
      verbose: true
    });

    result.should.be.a.String;
    result.should.eql('echo "{\\"foo\\": \\"bar\\"}" |  http --verbose POST http://httpconsole.com/debug Content-Type:application/json Cookie:bar=baz');

    done();
  });

  it('should add flags', function (done) {
    var result = new HTTPSnippet(fixtures.short).httpie({
      indent: false,
      cert: 'foo',
      verbose: true
    });

    result.should.be.a.String;
    result.should.eql('http --verbose --cert=foo GET http://httpconsole.com/echo');

    done();
  });

  it('should use custom indentation', function (done) {
    var result = new HTTPSnippet(fixtures.simple).httpie({
      indent: '@'
    });

    result.should.be.a.String;
    result.replace(/\\\n/g, '').should.eql('echo "{\\"foo\\": \\"bar\\"}" |  @http POST http://httpconsole.com/debug @Content-Type:application/json @Cookie:bar=baz');

    done();
  });
});
