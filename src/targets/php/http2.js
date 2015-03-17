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

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  ',
    noTags: false,
    closingTag: false
  }, options)

  var code = []
  var hasBody = false

  if (!opts.noTags) {
    code.push('<?php')
    code.push(null)
  }

  if (!~helpers.methods.indexOf(source.method.toUpperCase())) {
    code.push(util.format("HttpRequest::methodRegister('%s');", source.method))
  }

  code.push('$client = new http\\Client;')
  code.push('$request = new http\\Client\\Request;')
  code.push(null)

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      code.push('$body = new http\\Message\\Body;')
      code.push(util.format('$body->append(new http\\QueryString(%s));', helpers.convert(source.postData.paramsObj, opts.indent)))
      code.push(null)
      hasBody = true
      break

    case 'multipart/form-data':
      var files = []
      var fields = {}

      source.postData.params.forEach(function (param) {
        if (param.fileName) {
          files.push({
            name: param.name,
            type: param.contentType,
            file: param.fileName,
            data: param.value
          })
        } else if (param.value) {
          fields[param.name] = param.value
        }
      })

      code.push('$body = new http\\Message\\Body;')

      code.push(util.format('$body->addForm(%s, %s);',
        Object.keys(fields).length ? helpers.convert(fields, opts.indent) : 'NULL',
        files.length ? helpers.convert(files, opts.indent) : 'NULL'
      ))

      // remove the contentType header
      if (~source.headersObj['content-type'].indexOf('boundary')) {
        delete source.headersObj['content-type']
      }

      code.push(null)

      hasBody = true
      break

    default:
      if (source.postData.text) {
        code.push('$body = new http\\Message\\Body;')
        code.push(util.format('$body->append(%s);', helpers.convert(source.postData.text)))
        code.push(null)
        hasBody = true
      }
  }

  code.push(util.format('$request->setRequestUrl(%s);', helpers.convert(source.url)))
  code.push(util.format('$request->setRequestMethod(%s);', helpers.convert(source.method)))

  if (hasBody) {
    code.push(util.format('$request->setBody($body);'))
    code.push(null)
  }

  if (Object.keys(source.queryObj).length) {
    code.push(util.format('$request->setQuery(new http\\QueryString(%s));', helpers.convert(source.queryObj, opts.indent)))
    code.push(null)
  }

  if (Object.keys(source.headersObj).length) {
    code.push(util.format('$request->setHeaders(%s);', helpers.convert(source.headersObj, opts.indent)))
    code.push(null)
  }

  if (Object.keys(source.cookiesObj).length) {
    code.push(null)
    code.push(util.format('$client->setCookies(%s);', helpers.convert(source.cookiesObj, opts.indent)))
    code.push(null)
  }

  code.push('$client->enqueue($request)->send();')
  code.push('$response = $client->getResponse();')
  code.push(null)
  code.push('echo $response->getBody();')

  if (opts.closingTag) {
    code.push(null)
    code.push('?>')
  }

  return code.join('\n')
}

module.exports.info = {
  key: 'http2',
  title: 'HTTP v2',
  link: 'http://devel-m6w6.rhcloud.com/mdref/http',
  description: 'PHP with pecl/http v2'
}
