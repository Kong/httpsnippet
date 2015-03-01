'use strict';

var util = require('util');

module.exports = function (opts) {
  var code = [];

  code.push('wget --quiet');

  code.push(util.format('--method %s', this.source.method));

  // construct cookies argument
  if (this.source.cookies && this.source.cookies.length) {
    var cookies = this.source.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    code.push(util.format('--header "Cookie: %s"', cookies.join('; ')));
  }

  if (this.source.headers && this.source.headers.length) {
    this.source.headers.map(function (header) {
      code.push(util.format('--header "%s: %s"', header.name, header.value));
    });
  }

  if (this.source.postData) {
    code.push('--body-data ' + JSON.stringify(this.source.postData.text));
  }

  code.push('--output-document');

  code.push(util.format('- "%s"', this.source.url));

  return code.join(' \\\n     ');
};
