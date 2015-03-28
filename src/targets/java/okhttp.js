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

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent)

  var methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS' ]
  
  if (methods.indexOf(source.method.toUpperCase()) === -1) {
	  return 'Method not supported'
  }
  
  if (source.postData.text) {
	  RequestBody body = RequestBody.create(JSON, json);
    code.push(1, 'RequestBody body = RequestBody.create("%s", %s);', source.postData.mimeType, JSON.stringify(source.postData.text))
  }
  
  code.push('Request request = new Request.Builder()')
  code.push('.url("%s")', source.fullUrl)
  if(source.postData.text){
    code.push(1,'.%s(body)', source.method)  
  }else{
    code.push(1,'.%s()', source.method) 
  }
  
  // Add headers, including the cookies
  var headers = Object.keys(source.allHeaders)

  // construct headers
  if (headers.length) {
    headers.map(function (key) {
      code.push(1, '.addHeader("%s", "%s")', key, source.allHeaders[key])
    })
  }

  code.push(1, '.build();')
  
  code.push('Response response = client.newCall(request).execute();')

  return code.join()
}

module.exports.info = {
  key: 'okhttp',
  title: 'OkHttp',
  link: 'http://square.github.io/okhttp/',
  description: 'An HTTP Request Client Library'
}
