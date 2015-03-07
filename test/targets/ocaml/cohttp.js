'use strict';

var fixtures = require('../../fixtures');
var HTTPSnippet = require('../../../src');
var should = require('should');

describe('OCaml', function () {
  it('should convert full request to an OCaml snippet', function (done) {
    var result = new HTTPSnippet(fixtures.full).convert('ocaml', 'cohttp', {
      indent: '\t'
    });

    result.replace(/\n/g, '').should.eql('open Cohttp_lwt_unixopen Lwtlet uri = Uri.of_string "http://mockbin.com/request?baz=abc&foo=bar&foo=baz" inlet headers = Header.init ()\t|> fun h -> Header.add h "Accept" "text/plain"\t|> fun h -> Header.add h "Content-Type" "application/json"\t|> fun h -> Header.add h "X-Pretty-Print" "2"\t|> fun h -> Header.add h "Cookie" "foo=bar; bar=baz"inlet body = "{\\"foo\\": \\"bar\\"}" inClient.call ~headers ~body (Code.method_of_string "POST") uri>>= fun (res, body_stream) ->\t(* Do stuff with the result *)');

    done();
  });

  it('should convert query request to an OCaml snippet', function (done) {
    var result = new HTTPSnippet(fixtures.query).convert('ocaml', 'cohttp', {
      indent: '\t'
    });

    result.replace(/\n/g, '').should.eql('open Cohttp_lwt_unixopen Lwtlet uri = Uri.of_string "http://mockbin.com/request?key=value&baz=abc&foo=bar&foo=baz" inClient.call (Code.method_of_string "POST") uri>>= fun (res, body_stream) ->\t(* Do stuff with the result *)');

    done();
  });

  it('should convert simple request to an OCaml snippet', function (done) {
    var result = new HTTPSnippet(fixtures.simple).convert('ocaml', 'cohttp', {
      indent: '\t'
    });

    result.replace(/\n/g, '').should.eql('open Cohttp_lwt_unixopen Lwtlet uri = Uri.of_string "http://mockbin.com/request?foo=bar" inlet headers = Header.init ()\t|> fun h -> Header.add h "Content-Type" "application/json"\t|> fun h -> Header.add h "Cookie" "bar=baz"inlet body = "{\\"foo\\": \\"bar\\"}" inClient.call ~headers ~body (Code.method_of_string "POST") uri>>= fun (res, body_stream) ->\t(* Do stuff with the result *)');

    done();
  });

  it('should convert short request to an OCaml snippet', function (done) {
    var result = new HTTPSnippet(fixtures.short).convert('ocaml', 'cohttp', {
      indent: '\t'
    });

    result.replace(/\n/g, '').should.eql('open Cohttp_lwt_unixopen Lwtlet uri = Uri.of_string "http://mockbin.com/echo" inClient.call (Code.method_of_string "GET") uri>>= fun (res, body_stream) ->\t(* Do stuff with the result *)');

    done();
  });

  it('should convert http1 request to an OCaml snippet', function (done) {
    var result = new HTTPSnippet(fixtures.http1).convert('ocaml', 'cohttp', {
      indent: '\t'
    });

    result.replace(/\n/g, '').should.eql('open Cohttp_lwt_unixopen Lwtlet uri = Uri.of_string "http://mockbin.com/request" inClient.call (Code.method_of_string "GET") uri>>= fun (res, body_stream) ->\t(* Do stuff with the result *)');

    done();
  });
});
