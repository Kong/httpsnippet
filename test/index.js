'use strict';

var fixtures = require('./fixtures');
var HTTPSnippet = require('../src');
var should = require('should');

describe('HTTPSnippet', function () {
  var targets = HTTPSnippet.availableTargets();

  targets.map(function (target) {
    it('availableTargets should include ' + target.title, function (done) {
      fixtures['available-targets'].should.containEql(target);
      done();
    });
  });

  it('should add "uriObj" to source object', function (done) {
    var req = new HTTPSnippet(fixtures.requests.query).source;

    req.uriObj.should.be.an.Object;
    req.uriObj.should.eql({
      auth: null,
      hash: null,
      host: 'mockbin.com',
      hostname: 'mockbin.com',
      href: 'http://mockbin.com/har?key=value',
      path: '/har?key=value&baz=abc&foo=bar&foo=baz',
      pathname: '/har',
      port: null,
      protocol: 'http:',
      query: {
        baz: 'abc',
        key: 'value',
        foo: [
          'bar',
          'baz'
        ]
      },
      search: 'key=value&baz=abc&foo=bar&foo=baz',
      slashes: true
    });

    done();
  });

  it('should add "queryObj" to source object', function (done) {
    var req = new HTTPSnippet(fixtures.requests.query).source;

    req.queryObj.should.be.an.Object;
    req.queryObj.should.eql({
      baz: 'abc',
      key: 'value',
      foo: [
        'bar',
        'baz'
      ]
    });

    done();
  });

  it('should add "headersObj" to source object', function (done) {
    var req = new HTTPSnippet(fixtures.requests.headers).source;

    req.headersObj.should.be.an.Object;
    req.headersObj.should.eql({
      'Accept': 'application/json',
      'X-Foo': 'Bar'
    });

    done();
  });

  it('should modify orignal url to strip query string', function (done) {
    var req = new HTTPSnippet(fixtures.requests.query).source;

    req.url.should.be.a.String;
    req.url.should.eql('http://mockbin.com/har');

    done();
  });

  it('should add "fullUrl" to source object', function (done) {
    var req = new HTTPSnippet(fixtures.requests.query).source;

    req.fullUrl.should.be.a.String;
    req.fullUrl.should.eql('http://mockbin.com/har?key=value&baz=abc&foo=bar&foo=baz');

    done();
  });

  it('should fix "path" property of "uriObj" to match queryString', function (done) {
    var req = new HTTPSnippet(fixtures.requests.query).source;

    req.uriObj.path.should.be.a.String;
    req.uriObj.path.should.eql('/har?key=value&baz=abc&foo=bar&foo=baz');

    done();
  });

  it('should parse a queryString in the url into querString object', function (done) {
    var req = new HTTPSnippet(fixtures.requests.query).source;

    req.queryString.should.be.a.Obj;
    req.queryString.should.eql({
      key: 'value',
      foo: ['bar', 'baz'],
      baz: 'abc'
    });

    done();
  });
});
