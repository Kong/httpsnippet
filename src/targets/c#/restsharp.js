'use strict'

var util = require('util')

var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent)

  var methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS' ]

  if (methods.indexOf(source.method.toUpperCase()) === -1) {
    return 'Method not supported'
  } else {
    code.push('var client = new RestClient("%s");', source.fullUrl)
    code.push('var request = new RestRequest(Method.%s);', source.method.toUpperCase())

  }

  // construct headers
  if (source.headers.length) {
    source.headers.forEach(function (header) {
      code.push('request.AddHeader("%s", "%s");', header.name, header.value)
    })
  }

  // construct cookies
  if (source.cookies.length) {
    source.cookies.forEach(function (cookie) {
      code.push('request.AddCookie("%s", "%s");', cookie.name, cookie.value)
    })
  }

  if (source.postData.text) {
    code.push('request.AddParameter("%s", %s, ParameterType.RequestBody);', source.allHeaders['content-type'], JSON.stringify(source.postData.text))
  }

  code.push('IRestResponse response = client.Execute(request);')
  return code.join()
}

module.exports.info = {
  key: 'restsharp',
  title: 'RestSharp',
  link: 'http://restsharp.org/',
  description: 'Simple REST and HTTP API Client for .NET'
}
