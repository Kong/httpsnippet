/**
 * @description
 * HTTP code snippet generator for Java using Unirest.
 *
 * @author
 * @shashiranjan84
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (options) {
  var self = this
  var opts = util._extend({
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent)

  var methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS' ]

  if (methods.indexOf(self.source.method.toUpperCase()) === -1) {
    code.push(util.format('HttpResponse<String> response = Unirest.customMethod("%s","%s")', self.source.method.toUpperCase(), self.source.fullUrl))
  } else {
    code.push(util.format('HttpResponse<String> response = Unirest.%s("%s")', self.source.method.toLowerCase(), self.source.fullUrl))
  }

  // Add headers, including the cookies
  var headers = Object.keys(self.source.allHeaders)

  // construct headers
  if (headers.length) {
    headers.map(function (key) {
      code.push(1, util.format('.header("%s", "%s")', key, self.source.allHeaders[key]))
    })
  }

  if (self.source.postData.text) {
    code.push(1, util.format('.body(%s)', JSON.stringify(self.source.postData.text)))
  }

  code.push(1, '.asString();')

  return code.join()
}

module.exports.info = {
  key: 'unirest',
  title: 'Unirest',
  link: 'http://unirest.io/java.html',
  description: 'Lightweight HTTP Request Client Library'
}
