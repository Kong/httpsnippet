'use strict';

var fixtures = require('../fixtures');
var HTTPSnippet = require('../../src');
var should = require('should');

describe('Wget', function () {
  it('should convert simple request to Wget command', function (done) {
    var result = new HTTPSnippet(fixtures.simple).wget({
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('wget --quiet --method POST --header "Cookie: bar=baz" --header "Content-Type: application/json" --body-data "{\\"foo\\": \\"bar\\"}" --output-document - "http://httpconsole.com/debug?foo=bar"');

    done();
  });

  it('should use short options', function (done) {
    var result = new HTTPSnippet(fixtures.simple).wget({
      short: true,
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('wget -q --method POST --header "Cookie: bar=baz" --header "Content-Type: application/json" --body-data "{\\"foo\\": \\"bar\\"}" -O - "http://httpconsole.com/debug?foo=bar"');

    done();
  });

  it('should ask for verbose output', function (done) {
    var result = new HTTPSnippet(fixtures.simple).wget({
      short: true,
      indent: false,
      verbose: true
    });

    result.should.be.a.String;
    result.should.eql('wget -v --method POST --header "Cookie: bar=baz" --header "Content-Type: application/json" --body-data "{\\"foo\\": \\"bar\\"}" -O - "http://httpconsole.com/debug?foo=bar"');

    done();
  });

  it('should use custom indentation', function (done) {
    var result = new HTTPSnippet(fixtures.simple).wget({
      indent: '@'
    });

    result.should.be.a.String;
    result.replace(/\\\n/g, '').should.eql('wget --quiet @--method POST @--header "Cookie: bar=baz" @--header "Content-Type: application/json" @--body-data "{\\"foo\\": \\"bar\\"}" @--output-document @- "http://httpconsole.com/debug?foo=bar"');

    done();
  });
});
