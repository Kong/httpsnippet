'use strict';

var util = require('util');

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  '
  }, options);

  var code = [];

  var reqOpts = {
    method: source.method,
    hostname: source.uriObj.hostname,
    port: source.uriObj.port,
    path: source.uriObj.path,
    headers: source.allHeaders
  };

  code.push('var http = require("http");');

  if (!source.postData.text && source.postData.params) {
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
  code.push(opts.indent + opts.indent + 'console.log(body);');
  code.push(opts.indent + '});');
  code.push('});');

  code.push(null);

  if (source.postData.text) {
    code.push(util.format('req.write(%s);', JSON.stringify(source.postData.text)));
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
