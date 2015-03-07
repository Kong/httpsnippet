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

  // construct headers
  this.source.headers.map(function (header) {
    code.push(util.format('%s "%s: %s"', opts.short ? '-H' : '--header', header.name, header.value));
  });

  // construct cookies
  var cookies = this.source.cookies.map(function (cookie) {
    return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
  });

  if (cookies.length) {
    code.push(util.format('%s "%s"', opts.short ? '-b' : '--cookie', cookies.join('; ')));
  }

  // request body
  if (this.source.postData.text) {
    code.push(util.format('%s %s', opts.short ? '-d' : '--data', JSON.stringify(this.source.postData.text)));
  }

  // construct post params
  if (!this.source.postData.text && this.source.postData.params && this.source.postData.params.length) {
    this.source.postData.params.map(function (param) {
      code.push(util.format('%s "%s=%s"', opts.short ? '-F' : '--form', param.name, param.value));
    });
  }

  return code.join(opts.indent !== false ? ' \\\n' + opts.indent : ' ');
};

module.exports.info = function () {
  return {
    key: 'curl',
    title: 'cURL',
    link: 'http://curl.haxx.se/',
    description: 'curl is a command line tool and library for transferring data with URL syntax',
    extname: '.sh'
  };
};
