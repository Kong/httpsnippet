/**
 * @description
 * HTTP code snippet generator for Java using JSoup.
 *
 * @author
 * @samuelfac
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

  var methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE' ]
  code.push('String response = Jsoup.connect("%s")', source.fullUrl)
  if (methods.indexOf(source.method.toUpperCase()) === -1) {
    code.push(1, '.method(Method.valueOf("%s"))', source.method.toUpperCase())
  } else {
    code.push(1, '.method(Method.%s)', source.method.toUpperCase())
  }
 
  // Add headers, including the cookies
  var headers = Object.keys(source.allHeaders)

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(1, '.header("%s", "%s")', key, source.allHeaders[key])
    })
  }

  if (source.postData.text) {
    code.push(1, '.requestBody(%s)', JSON.stringify(source.postData.text))
  }

  code.push(1, '.execute().body();')

  return code.join()
}

module.exports.info = {
  key: 'jsoup',
  title: 'JSoup',
  link: 'http://jsoup.org/',
  description: 'JSoup Java HTML Parser, with best of DOM, CSS, and jquery'
}
