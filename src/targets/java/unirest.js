'use strict'

var util = require('util')

module.exports = function (options) {
  var self = this
  var opts = util._extend({
    indent: '  '
  }, options)

  var code = []

  var methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS' ]

  code.push('//Import unirest libarary (http://unirest.io/java.html) \n')

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
      code.push(opts.indent + util.format('.header("%s", "%s")', key, self.source.allHeaders[key]))
    })
  }

  if (self.source.postData.text) {
    code.push(opts.indent + util.format('.body(%s)', JSON.stringify(self.source.postData.text)))
  }

  code.push(opts.indent + '.asString();')
  return code.join('\n')
}

module.exports.info = {
  key: 'unirest',
  title: 'Unirest',
  link: 'http://unirest.io/java.html',
  description: 'Lightweight HTTP Request Client Library'
}
