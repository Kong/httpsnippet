/**
 * @description
 * HTTP code snippet generator for Perl.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var helpers = require('../../helpers/shell')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var code = new CodeBuilder()
  code.push('#!/usr/bin/perl')
  code.push('use Modern::Perl;')
  code.push('use Data::Dumper;')
  code.push('use HTTP::Request::JSON;');
  code.push('use LWP::UserAgent::JSON;');
  code.push('my $request = HTTP::Request::JSON->new("%s",',helpers.quote(source.method));
  code.push('"%s");',helpers.quote(source.fullUrl));
  if (source.postData.text) {
    code.push('$request->content(' + helpers.escape(helpers.quote(source.postData.text))+');')
  }
  code.push('my $browser = LWP::UserAgent::JSON->new();');
  code.push('my $response = $browser->request($request);');
  code.push('print Dumper($response->json_content);');
  return code.join()
}

module.exports.info = {
  key: 'perl5',
  title: 'Perl5',
  link: 'https://www.perl.org/',
  description: 'Perl 5 is a highly capable, feature-rich programming language with over 29 years of development.'
}
