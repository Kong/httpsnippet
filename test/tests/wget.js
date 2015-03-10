'use strict';

require('should');

module.exports = function (snippet, fixtures) {
  it('should use short options', function () {
    var result = new snippet(fixtures.requests.full).convert('wget', {
      short: true,
      indent: false
    });

    result.should.be.a.String;
    // result.should.eql('wget -q --method POST --header "Cookie: bar=baz" --header "Content-Type: application/json" --body-data "{\\"foo\\": \\"bar\\"}" -O - "http://mockbin.com/request?foo=bar"');
  });

  it('should ask for verbose output', function () {
    var result = new snippet(fixtures.requests.short).convert('wget', {
      short: true,
      indent: false,
      verbose: true
    });

    result.should.be.a.String;
    result.should.eql('wget -v --method GET -O - "http://mockbin.com/har"');
  });

  it('should use custom indentation', function () {
    var result = new snippet(fixtures.requests.full).convert('wget', {
      indent: '@'
    });

    result.should.be.a.String;
    // result.replace(/\\\n/g, '').should.eql('wget --quiet @--method POST @--header "Cookie: bar=baz" @--header "Content-Type: application/json" @--body-data "{\\"foo\\": \\"bar\\"}" @--output-document @- "http://mockbin.com/request?foo=bar"');
  });
};
