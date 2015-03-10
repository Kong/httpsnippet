'use strict';

require('should');

module.exports = function (snippet, fixtures) {
  it('should ask for verbose output', function () {
    var result = new snippet(fixtures.requests.short).convert('httpie', {
      indent: false,
      verbose: true
    });

    result.should.be.a.String;
    result.should.eql('http --verbose GET http://mockbin.com/har');
  });

  it('should add flags', function () {
    var result = new snippet(fixtures.requests.short).convert('httpie', {
      indent: false,
      cert: 'foo',
      verbose: true
    });

    result.should.be.a.String;
    result.should.eql('http --verbose --cert=foo GET http://mockbin.com/har');
  });

  it('should use custom indentation', function () {
    var result = new snippet(fixtures.requests.full).convert('httpie', {
      indent: '@'
    });

    result.should.be.a.String;
    // result.replace(/\\\n/g, '').should.eql('echo "{\\"foo\\": \\"bar\\"}" |  @http POST http://mockbin.com/request?foo=bar @Content-Type:application/json @Cookie:bar=baz');
  });

  it('should use queryString parameters', function () {
    var result = new snippet(fixtures.requests.query).convert('httpie', {
      indent: false,
      queryParams: true
    });

    result.should.be.a.String;
    result.replace(/\\\n/g, '').should.eql('http GET http://mockbin.com/har key==value baz==abc foo==bar foo==baz');
  });
};
