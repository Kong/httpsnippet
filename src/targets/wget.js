'use strict';

var util = require('util');

module.exports = function (req, opts) {
  var code = [];

  code.push('wget --quiet');

  code.push(util.format('--method %s', req.method));

  // construct cookies argument
  if (req.cookies && req.cookies.length) {
    var cookies = req.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    code.push(util.format('--header "Cookie: %s"', cookies.join('; ')));
  }

  if (req.headers && req.headers.length) {
    req.headers.map(function (header) {
      code.push(util.format('--header "%s: %s"', header.name, header.value));
    });
  }

  if (req.postData) {
    code.push('--body-data ' + JSON.stringify(req.postData.text));
  }

  code.push('--output-document');

  code.push(util.format('- "%s"', req.url));

  return code.join(' \\\n     ');
};
