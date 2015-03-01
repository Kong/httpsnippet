'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    queryParams: false,
    body: false,
    cert: false,
    headers: false,
    indent: '  ',
    pretty: false,
    print: false,
    short: false,
    style: false,
    timeout: false,
    verbose: false,
    verify: false
  }, options);

  var code = [];

  // start with body pipe
  if (this.source.postData) {
    code.push(util.format('echo %s | ', JSON.stringify(this.source.postData.text)));
  }

  var flags = [];

  if (opts.headers) {
    flags.push(opts.short ? '-h' : '--headers');
  }

  if (opts.body) {
    flags.push(opts.short ? '-b' : '--body');
  }

  if (opts.verbose) {
    flags.push(opts.short ? '-v' : '--verbose');
  }

  if (opts.print) {
    flags.push(util.format('%s=%s', opts.short ? '-p' : '--print', opts.print));
  }

  if (opts.verify) {
    flags.push(util.format('--verify=%s', opts.verify));
  }

  if (opts.cert) {
    flags.push(util.format('--cert=%s', opts.cert));
  }

  if (opts.pretty) {
    flags.push(util.format('--pretty=%s', opts.pretty));
  }

  if (opts.style) {
    flags.push(util.format('--style=%s', opts.pretty));
  }

  if (opts.timeout) {
    flags.push(util.format('--timeout=%s', opts.timeout));
  }

  code.push(util.format('http %s%s %s', flags.length ? flags.join(' ') + ' ' : '', this.source.method, opts.queryParams ? this.source.url : this.source.fullUrl));

  var self = this;

  // construct query params
  if (opts.queryParams && this.source.queryString) {
    var queryStringKeys = Object.keys(this.source.queryString);

    if (queryStringKeys.length) {
      queryStringKeys.map(function (name) {
        var value = self.source.queryString[name];

        if (util.isArray(value)) {
          value.map(function (val) {
            code.push(util.format('%s==%s', name, val));
          });
        } else {
          code.push(util.format('%s==%s', name, value));
        }
      });
    }
  }

  // construct headers
  if (this.source.headers && this.source.headers.length) {
    this.source.headers.map(function (header) {
      code.push(util.format('%s:%s', header.name, header.value));
    });
  }

  // construct cookies argument
  if (this.source.cookies && this.source.cookies.length) {
    var cookies = this.source.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    code.push(util.format('Cookie:%s', cookies.join('; ')));
  }

  return code.join(opts.indent !== false ? ' \\\n' + opts.indent : ' ');
};

module.exports.extname = function () {
  return '.sh';
};
