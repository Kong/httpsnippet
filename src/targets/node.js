'use strict';

var util = require('util');

module.exports = function (options) {
  var opts = util._extend({
    indent: '  '
  }, options);

  var code = [];

  var reqOpts = {
    method: this.source.method,
    hostname: this.source.uriObj.hostname,
    port: this.source.uriObj.port,
    path: this.source.uriObj.path,
    headers: this.source.headersObj
  };

  // construct cookies argument
  if (this.source.cookies && this.source.cookies.length) {
    var cookies = this.source.cookies.map(function (cookie) {
      return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
    });

    reqOpts.headers.Cookie = cookies.join('; ');
  }

  code.push('var http = require("http");');

  code.push(null);

  code.push(util.format('var options = %s;', JSON.stringify(reqOpts, null, 2)));

  code.push(null);

  code.push('var req = http.request(options, function (res) {');

  code.push(opts.indent + 'var chunks = [];');

  code.push(null);

  code.push(opts.indent + 'res.on("data", function (chunk) {');
  code.push(opts.indent + opts.indent + 'chunks.push(chunk);');
  code.push(opts.indent + '});');

  code.push(null);

  code.push(opts.indent + 'res.on("end", function () {');
  code.push(opts.indent + opts.indent + 'var body = Buffer.concat(chunks);');
  code.push(opts.indent + '});');
  code.push('});');

  if (this.source.postData) {
    code.push(null);
    code.push(util.format('req.write(%s)', JSON.stringify(this.source.postData.text)));
  }

  code.push('req.end();');

  code.push(null);
  return code.join('\n');
};

module.exports.extname = function () {
  return '.js';
};
