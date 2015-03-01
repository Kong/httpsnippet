'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    indent: '  ',
    short: false,
    verbose: false
  }, options);

  var code = [];

  if (opts.verbose) {
    code.push(util.format('wget %s', opts.short ? '-v' : '--verbose'));
  } else {
    code.push(util.format('wget %s', opts.short ? '-q' : '--quiet'));
  }

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

  code.push(opts.short ? '-O' : '--output-document');

  code.push(util.format('- "%s"', this.source.fullUrl));

  return code.join(opts.indent !== false ? ' \\\n' + opts.indent : ' ');
};

module.exports.info = function () {
  return {
    key: 'wget',
    ext: '.sh',
    title: 'Wget',
    link: 'https://www.gnu.org/software/wget/',
    description: 'a free software package for retrieving files using HTTP, HTTPS'
  };
};
