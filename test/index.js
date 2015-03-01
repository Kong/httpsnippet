'use strict';

var fixtures = require('./fixtures');
var HTTPSnippet = require('../src');

require('should');

describe('HTTPSnippet', function () {
  it('should list all available targets', function (done) {
    var targets = HTTPSnippet._targets().sort();

    targets.should.be.an.Array;
    targets.should.eql(['curl', 'httpie', 'node', 'php', 'wget']);

    done();
  });

  it('should add "uriObj" to source object', function (done) {
    var req = new HTTPSnippet(fixtures.simple).getSource();

    req.uriObj.should.be.an.Object;
    req.uriObj.should.eql({
      auth: null,
      hash: null,
      host: 'httpconsole.com',
      hostname: 'httpconsole.com',
      href: 'http://httpconsole.com/debug',
      path: '/debug',
      pathname: '/debug',
      port: null,
      protocol: 'http:',
      query: null,
      search: null,
      slashes: true
    });

    done();
  });

  it('should add "queryObj" to source object', function (done) {
    var req = new HTTPSnippet(fixtures.simple).getSource();

    req.queryObj.should.be.an.Object;
    req.queryObj.should.eql({
      foo: 'bar'
    });

    done();
  });

  it('should add "headersObj" to source object', function (done) {
    var req = new HTTPSnippet(fixtures.simple).getSource();

    req.headersObj.should.be.an.Object;
    req.headersObj.should.eql({
      'Content-Type': 'application/json'
    });

    done();
  });

  it('should modify orignal url to strip query string', function (done) {
    var req = new HTTPSnippet(fixtures.query).getSource();

    req.url.should.be.a.String;
    req.url.should.eql('http://httpconsole.com/debug');

    done();
  });

  it('should add "fullUrl" to source object', function (done) {
    var req = new HTTPSnippet(fixtures.query).getSource();

    req.fullUrl.should.be.a.String;
    req.fullUrl.should.eql('http://httpconsole.com/debug?key=value&baz=abc&foo=bar&foo=baz');

    done();
  });

  it('should parse and queryString in the url into querString object', function (done) {
    var req = new HTTPSnippet(fixtures.query).getSource();

    req.queryString.should.be.a.Obj;
    req.queryString.should.eql({
      key: 'value',
      foo: ['bar', 'baz'],
      baz: 'abc'
    });

    done();
  });
});
