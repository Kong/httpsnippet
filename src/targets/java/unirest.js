'use strict'

var util = require('util')

module.exports = function (options) {
  var self = this
  var opts = util._extend({
    indent: '  '
  }, options)

  var code = []

  var methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS' ]

  if (methods.indexOf(self.source.method.toUpperCase()) === -1) {
    return self.source.method.toUpperCase() + ' method not supported by Unirest liabrary.'
  }

  code.push(util.format('HttpResponse<String> response = Unirest.%s("%s")', self.source.method.toLowerCase(), self.source.fullUrl))

  // Add headers, including the cookies
  var headers = Object.keys(self.source.allHeaders)

  // construct headers
  if (headers.length) {
    headers.map(function (key) {
      code.push(util.format('.header("%s", "%s")', key, self.source.allHeaders[key]))
    })
  }

  // construct postdata
  if (self.source.postData) {
    if (self.source.postData.text) {
      code.push(util.format('.body(%s)', JSON.stringify(self.source.postData.text)))
    }
  }

  code.push('.asString();')
  return code.join('\n' + opts.indent)
}

module.exports.info = {
  key: 'unirest',
  title: 'Unirest',
  link: 'http://unirest.io/java.html',
  description: 'Lightweight HTTP Request Client Library'
}
