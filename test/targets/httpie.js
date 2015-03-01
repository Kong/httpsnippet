'use strict';

var fixtures = require('../fixtures');
var HTTPSnippet = require('../../src');

require('should');

describe('httpie', function () {
  it('should convert simple request to httpie command', function (done) {
    var result = new HTTPSnippet(fixtures.simple).httpie({
      lineBreaks: false
    });

    result.should.be.a.String;
    result.should.eql('echo "{\\"foo\\": \\"bar\\"}" |  http POST httpconsole.com/debug Content-Type:application/json Content-Type:application/json');

    done();
  });

  it('should use custom indentation', function (done) {
    var result = new HTTPSnippet(fixtures.simple).httpie({
      lineBreaks: true,
      indent: '@'
    });

    result.should.be.a.String;
    result.replace(/\\\n/g, '').should.eql('echo "{\\"foo\\": \\"bar\\"}" |  @http POST httpconsole.com/debug @Content-Type:application/json @Content-Type:application/json');

    done();
  });
});
