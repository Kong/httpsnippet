'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    indent: '  '
  }, options);

  var code = [];

  code.push('open Cohttp_lwt_unix');
  code.push('open Lwt');
  code.push('');

  // Create URI
  code.push(util.format('let uri = Uri.of_string "%s" in', this.source.fullUrl));

  // Add headers, including the cookies
  var headersPresent = this.source.headers && this.source.headers.length;
  var cookiesPresent = this.source.cookies && this.source.cookies.length;

  if (headersPresent || cookiesPresent) {
    code.push('let headers = Header.init ()');

    if (headersPresent) {
      for (var header in this.source.headers) {
        code.push(util.format(opts.indent + '|> fun h -> Header.add h "%s" "%s"', this.source.headers[header].name, this.source.headers[header].value));
      }
    }

    if (cookiesPresent) {
      var cookie = this.source.cookies.map(function (cookie) {
        return cookie.name + '=' + cookie.value;
      }).join('; ');

      code.push(util.format(opts.indent + '|> fun h -> Header.add h "Cookie" "%s"', cookie));
    }

    code.push('in');
  }

  // Add body
  var bodyPresent = this.source.postData && this.source.postData.text;

  if (bodyPresent) {
    // Just text
    code.push(util.format('let body = %s in', JSON.stringify(this.source.postData.text)));
  } else if (this.source.postData && !this.source.postData.text && this.source.postData.params && this.source.postData.params.length) {
    // Post params
    bodyPresent = true;

    var body = this.source.postData.params.map(function (param) {
      return param.name + '=' + param.value;
    }).join('&');

    code.push(util.format('let body = "%s" in', body));
  }

  // Do the request
  code.push('');

  code.push(util.format('Client.call %s%s(Code.method_of_string "%s") uri',
    (headersPresent || cookiesPresent) ? '~headers ' : '',
    bodyPresent ? '~body ' : '',
    this.source.method
  ));

  // Catch result
  code.push('>>= fun (res, body_stream) ->');
  code.push(opts.indent + '(* Do stuff with the result *)');

  return code.join('\n');
};

module.exports.info = {
  key: 'cohttp',
  title: 'CoHTTP',
  link: 'https://github.com/mirage/ocaml-cohttp',
  description: 'Cohttp is a very lightweight HTTP server using Lwt or Async for OCaml'
};
