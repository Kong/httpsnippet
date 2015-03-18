'use strict'

var util = require('util')

module.exports = function (source, options) {
  var self = this
  var code = []
  code.push("require 'uri'")
  code.push("require 'net/http'")
  code.push(null)

  // To support custom methods we check for the supported methods
  // and if doesn't exist then we build a custom class for it
  var method = source.method.toUpperCase()
  var methods = ['GET', 'POST', 'HEAD', 'DELETE', 'PATCH', 'PUT', 'OPTIONS', 'COPY', 'LOCK', 'UNLOCK', 'MOVE', 'TRACE']
  var capMethod = method.charAt(0) + method.substring(1).toLowerCase()
  if (methods.indexOf(method) < 0) {
    code.push(util.format('class Net::HTTP::%s < Net::HTTPRequest', capMethod))
    code.push(util.format("  METHOD = '%s'", method.toUpperCase()))
    code.push(util.format("  REQUEST_HAS_BODY = '%s'", self.source.postData.text ? 'true' : 'false'))
    code.push('  RESPONSE_HAS_BODY = true')
    code.push('end')
    code.push(null)
  }

  code.push(util.format('url = URI("%s")', source.fullUrl))

  code.push(null)

  code.push('http = Net::HTTP.new(url.host, url.port)')

  if (source.uriObj.protocol === 'https:') {
    code.push('http.use_ssl = true')
    code.push('http.verify_mode = OpenSSL::SSL::VERIFY_NONE')
  }

  code.push(null)

  code.push(util.format('request = Net::HTTP::%s.new(url)', capMethod))

  var headers = Object.keys(self.source.allHeaders)
  if (headers.length) {
    headers.map(function (key) {
      code.push(util.format('request["%s"] = \'%s\'', key, self.source.allHeaders[key]))
    })
  }

  if (self.source.postData.text) {
    code.push(util.format('request.body = %s', JSON.stringify(self.source.postData.text)))
  }

  code.push(null)

  code.push('response = http.request(request)')
  code.push('puts response.read_body')

  return code.join('\n')
}

module.exports.info = {
  key: 'native',
  title: 'net::http',
  link: 'http://ruby-doc.org/stdlib-2.2.1/libdoc/net/http/rdoc/Net/HTTP.html',
  description: 'Ruby HTTP client'
}
