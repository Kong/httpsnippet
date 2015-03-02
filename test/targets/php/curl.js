'use strict';

var fixtures = require('../../fixtures');
var HTTPSnippet = require('../../../src');
var should = require('should');

describe('PHP', function () {
  it('should convert full request to php script', function (done) {
    var result = new HTTPSnippet(fixtures.full).convert('php', 'curl', {
      indent: '\t'
    });

    result.replace(/\n/g, '').should.eql('<?php$curl = curl_init();curl_setopt_array($curl, array(\tCURLOPT_URL => "http://httpconsole.com/debug?baz=abc&foo=bar&foo=baz",\tCURLOPT_RETURNTRANSFER => true,\tCURLOPT_ENCODING => "",\tCURLOPT_MAXREDIRS => 10,\tCURLOPT_TIMEOUT => 30,\tCURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,\tCURLOPT_CUSTOMREQUEST => "POST",\tCURLOPT_POSTFIELDS => "{\\"foo\\": \\"bar\\"}",\tCURLOPT_COOKIE => "foo=bar; bar=baz",\tCURLOPT_HTTPHEADER => array(\t\t"Accept: text/plain",\t\t"Content-Type: application/json",\t\t"X-Pretty-Print: 2"\t),));$response = curl_exec($curl);curl_close($curl);');

    done();
  });
});
