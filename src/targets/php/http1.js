/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var helpers = require('./helpers')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  ',
    noTags: false,
    closingTag: false
  }, options)

  var code = new CodeBuilder(opts.indent)

  if (!opts.noTags) {
    code.push('<?php')
    code.push(null)
  }

  if (!~helpers.methods.indexOf(source.method.toUpperCase())) {
    code.push(util.format('HttpRequest::methodRegister(\'%s\');', source.method))
  }

  code.push('$request = new HttpRequest();')
  code.push(util.format('$request->setUrl(%s);', helpers.convert(source.url)))

  if (~helpers.methods.indexOf(source.method.toUpperCase())) {
    code.push(util.format('$request->setMethod(HTTP_METH_%s);', source.method.toUpperCase()))
  } else {
    code.push(util.format('$request->setMethod(HttpRequest::HTTP_METH_%s);', source.method.toUpperCase()))
  }
  code.push(null)

  if (Object.keys(source.queryObj).length) {
    code.push(util.format('$request->setQueryData(%s);', helpers.convert(source.queryObj, opts.indent)))
    code.push(null)
  }

  if (Object.keys(source.headersObj).length) {
    code.push(util.format('$request->setHeaders(%s);', helpers.convert(source.headersObj, opts.indent)))
    code.push(null)
  }

  if (Object.keys(source.cookiesObj).length) {
    code.push(util.format('$request->setCookies(%s);', helpers.convert(source.cookiesObj, opts.indent)))
    code.push(null)
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      code.push(util.format('$request->setContentType(%s);', helpers.convert(source.postData.mimeType)))
      code.push(util.format('$request->setPostFields(%s);', helpers.convert(source.postData.paramsObj, opts.indent)))
      code.push(null)
      break

    default:
      if (source.postData.text) {
        code.push(util.format('$request->setBody(%s);', helpers.convert(source.postData.text)))
        code.push(null)
      }
  }

  code.push('try {')
  code.push(opts.indent + '$response = $request->send();')
  code.push(null)
  code.push(opts.indent + 'echo $response->getBody();')
  code.push('} catch (HttpException $ex) {')
  code.push(opts.indent + 'echo $ex;')
  code.push('}')

  if (opts.closingTag) {
    code.push(null)
    code.push('?>')
  }

  return code.join('\n')
}

module.exports.info = {
  key: 'http1',
  title: 'HTTP v1',
  link: 'http://php.net/manual/en/book.http.php',
  description: 'PHP with pecl/http v1'
}
