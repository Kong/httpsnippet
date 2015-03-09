'use strict';

var util = require('util');
var reducer = require('.,/../../reducer');

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
  var cookies = this.source.cookies.map(function (cookie) {
    return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
  });

  if (cookies.length) {
    reqOpts.headers.Cookie = cookies.join('; ');
  }

  code.push('var http = require("http");');

  if (!this.source.postData.text && this.source.postData.params) {
    code.push('var querystring = require("querystring");');
  }

  code.push(null);

  code.push(util.format('var options = %s;', JSON.stringify(reqOpts, null, opts.indent)));

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

  code.push(null);

  if (this.source.postData.text) {
    code.push(util.format('req.write(%s);', JSON.stringify(this.source.postData.text)));
  }

  if (!this.source.postData.text && this.source.postData.params) {
    var postData = this.source.postData.params.reduce(reducer, {});

    code.push(util.format('var postData = querystring.stringify(%s);', JSON.stringify(postData)));
    code.push(util.format('req.write(postData);'));
  }

  code.push('req.end();');

  return code.join('\n');
};

module.exports.info = {
  key: 'native',
  title: 'HTTP',
  link: 'http://nodejs.org/api/http.html#http_http_request_options_callback',
  description: 'Node.js native HTTP interface'
};
