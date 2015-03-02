'use strict';

var fixtures = require('../../fixtures');
var HTTPSnippet = require('../../../src');
var should = require('should');

describe('Node.js', function () {
  it('should convert full request to a nodejs script', function (done) {
    var result = new HTTPSnippet(fixtures.full).convert('node', {
      indent: '\t'
    });

    result.replace(/\n/g, '').should.eql('var http = require("http");var options = {\t"method": "POST",\t"hostname": "httpconsole.com",\t"port": null,\t"path": "/debug?baz=abc&foo=bar&foo=baz",\t"headers": {\t\t"Accept": "text/plain",\t\t"Content-Type": "application/json",\t\t"X-Pretty-Print": "2",\t\t"Cookie": "foo=bar; bar=baz"\t}};var req = http.request(options, function (res) {\tvar chunks = [];\tres.on("data", function (chunk) {\t\tchunks.push(chunk);\t});\tres.on("end", function () {\t\tvar body = Buffer.concat(chunks);\t});});req.write("{\\"foo\\": \\"bar\\"}")req.end();');

    done();
  });
});
