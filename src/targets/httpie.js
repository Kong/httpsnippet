'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    lineBreaks: true,
    indent: '    '
  }, options);

  var code = [];

  if (this.source.postData) {
    code.push(util.format('echo %s | ', JSON.stringify(this.source.postData.text)));
  }

  code.push(util.format('http %s %s%s', this.source.method, this.source.uriObj.hostname, this.source.uriObj.pathname));

  // construct query params
  if (this.source.queryString && this.source.queryString.length) {
    this.source.queryString.map(function (query) {
      code.push(util.format('%s==%s', query.name, query.value));
    });
  }

  if (this.source.headers && this.source.headers.length) {
    this.source.headers.map(function (header) {
      code.push(util.format('%s:%s', header.name, header.value));
    });
  }

  if (this.source.headers && this.source.headers.length) {
    this.source.headers.map(function (header) {
      code.push(util.format('%s:%s', header.name, header.value));
    });
  }

  return code.join(opts.lineBreaks ? ' \\\n' + opts.indent : ' ');
};
