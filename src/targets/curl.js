'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    short: false,
    indent: '  '
  }, options);

  var code = [];

  code.push(util.format('curl %s %s', opts.short ? '-X' : '--request', this.source.method));

  code.push(util.format('%s"%s"', opts.short ? '' : '--url ', this.source.fullUrl));

  if (this.source.httpVersion === 'HTTP/1.0') {
    code.push(opts.short ? '-0' : '--http1.0');
  }

  // construct cookies
  if (this.source.cookies && this.source.cookies.length) {
    var cookies = this.source.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    code.push(util.format('%s "%s"', opts.short ? '-b' : '--cookie', cookies.join('; ')));
  }

  // construct headers
  if (this.source.headers && this.source.headers.length) {
    this.source.headers.map(function (header) {
      code.push(util.format('%s "%s: %s"', opts.short ? '-H' : '--header', header.name, header.value));
    });
  }

  // request body
  if (this.source.postData) {
    code.push(util.format('%s %s', opts.short ? '-d' : '--data', JSON.stringify(this.source.postData.text)));
  }

  return code.join(opts.indent !== false ? ' \\\n' + opts.indent : ' ');
};

module.exports.info = function () {
  return {
    key: 'curl',
    ext: '.sh',
    title: 'cURL',
    link: 'http://curl.haxx.se/',
    description: 'curl is a command line tool and library for transferring data with URL syntax'
  };
};
