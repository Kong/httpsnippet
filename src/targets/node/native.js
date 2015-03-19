/**
 * @description
 * HTTP code snippet generator for native Node.js.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent)

  var reqOpts = {
    method: source.method,
    hostname: source.uriObj.hostname,
    port: source.uriObj.port,
    path: source.uriObj.path,
    headers: source.allHeaders
  }

  code.push(util.format('var http = require("%s");', source.uriObj.protocol.replace(':', '')))

  if (!source.postData.text && source.postData.params) {
    code.push('var querystring = require("querystring");')
  }

  code.push(null)

  code.push(util.format('var options = %s;', JSON.stringify(reqOpts, null, opts.indent)))

  code.push(null)

  code.push('var req = http.request(options, function (res) {')

  code.push(1, 'var chunks = [];')

  code.push(null)

  code.push(1, 'res.on("data", function (chunk) {')
  code.push(2, 'chunks.push(chunk);')
  code.push(1, '});')

  code.push(null)

  code.push(opts.indent + 'res.on("end", function () {')
  code.push(opts.indent + opts.indent + 'var body = Buffer.concat(chunks);')
  code.push(opts.indent + opts.indent + 'console.log(body.toString());')
  code.push(opts.indent + '});')
  code.push('});')

  code.push(null)

  if (source.postData.text) {
    code.push(util.format('req.write(%s);', JSON.stringify(source.postData.text)))
  }

  code.push('req.end();')

  return code.join()
}

module.exports.info = {
  key: 'native',
  title: 'HTTP',
  link: 'http://nodejs.org/api/http.html#http_http_request_options_callback',
  description: 'Node.js native HTTP interface'
}
