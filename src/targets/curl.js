'use strict';

var util = require('util');

module.exports = function (req, opts) {
  var code = [];

  code.push('curl -X ' + req.method);

  if (req.httpVersion === 'HTTP/1.0') {
    code.push('-0');
  }

  if (req.cookies && req.cookies.length) {
    var cookies = req.cookies.map(function(cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    code.push(util.format('-b "%s"', cookies.join('&')));
  }

  if (req.headers && req.headers.length) {
    req.headers.map(function(header) {
      code.push(util.format('-H "%s: %s"', header.name, header.value));
    });
  }

  if (req.postData) {
    code.push('-d ' + JSON.stringify(req.postData.text));
  }

  code.push(req.url);

  return code.join(' \\\n');
}
