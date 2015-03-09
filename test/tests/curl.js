'use strict';

require('should');

module.exports = function (snippet, fixtures) {
  it('should use short options', function (done) {
    var result = new snippet(fixtures.requests.full).convert('curl', {
      short: true,
      indent: false
    });

    result.should.be.a.String;
    // result.should.eql('curl -X POST "http://mockbin.com/request?foo=bar" -H "Content-Type: application/json" -b "bar=baz" -d "{\\"foo\\": \\"bar\\"}"');

    done();
  });

  it('should use --http1.0 for HTTP/1.0', function (done) {
    var result = new snippet(fixtures.curl.http1).convert('curl', {
      indent: false
    });

    result.should.be.a.String;
    result.should.eql('curl --request GET --url "http://mockbin.com/request" --http1.0');

    done();
  });

  it('should use custom indentation', function (done) {
    var result = new snippet(fixtures.requests.full).convert('curl', {
      indent: '@'
    });

    result.should.be.a.String;
    // result.replace(/\\\n/g, '').should.eql('curl --request POST @--url "http://mockbin.com/request?foo=bar" @--header "Content-Type: application/json" @--cookie "bar=baz" @--data "{\\"foo\\": \\"bar\\"}"');

    done();
  });
};
