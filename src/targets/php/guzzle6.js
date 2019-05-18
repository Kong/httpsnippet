/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @RobertoArruda
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
'use strict'

var util = require('util')
var helpers = require('./helpers')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = Object.assign({
    closingTag: false,
    indent: '    ',
    maxRedirects: 10,
    namedErrors: false,
    noTags: false,
    shortTags: false,
    timeout: 30
  }, options)

  var code = new CodeBuilder(opts.indent)

  if (!opts.noTags) {
    code.push(opts.shortTags ? '<?' : '<?php')
      .blank()
  }

  code.push('$client = new \\GuzzleHttp\\Client();')
    .blank()
    .push('$response = $client->request(\'' + source.method + '\', \'' + source.fullUrl + '\', [')

  var requestOptions = new CodeBuilder(opts.indent)

  // construct headers
  var headers = Object.keys(source.headersObj).sort().map(function (key) {
    return opts.indent + opts.indent + util.format('\'%s\' => \'%s\',', key, source.headersObj[key])
  })

  // construct cookies
  var cookies = source.cookies.map(function (cookie) {
    return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value)
  })

  if (cookies.length) {
    headers.push(opts.indent + opts.indent + util.format('CURLOPT_COOKIE => \'%s\',', cookies.join('; ')))
  }

  if (headers.length) {
    requestOptions.push(1, '\'headers\' => [')
      .push(headers.join('\n'))
      .push(1, '],')
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      code.push(1, '\'form_params\' => %s,', helpers.convert(source.postData.paramsObj, opts.indent))
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

      code.push(
        1,
        '\'multipart\' => [%s => %s],',
        Object.keys(fields).length ? helpers.convert(fields, opts.indent) : 'NULL',
        files.length ? helpers.convert(files, opts.indent) : 'NULL'
      )

      // remove the contentType header
      if (~source.headersObj['content-type'].indexOf('boundary')) {
        delete source.headersObj['content-type']
      }
      break

    default:
      if (source.postData.text) {
        code.push(1, '\'body\' => %s,', helpers.convert(source.postData.text))
      }
  }

  code.push(requestOptions.join())
    .push(']);')
    .blank()
    .push('echo $response->getBody();')

  if (!opts.noTags && opts.closingTag) {
    code.blank()
      .push('?>')
  }

  return code.join()
}

module.exports.info = {
  key: 'guzzle6',
  title: 'Guzzle v6',
  link: 'http://docs.guzzlephp.org/en/stable/',
  description: 'PHP with guzzle v6'
}
