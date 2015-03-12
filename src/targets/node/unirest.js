'use strict'

var util = require('util')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  '
  }, options)

  var includeFS = false
  var code = ['var unirest = require("unirest");', null]

  code.push(util.format('var req = unirest("%s", "%s");', source.method, source.url))
  code.push(null)

  if (source.cookies.length) {
    code.push('var CookieJar = unirest.jar();')

    source.cookies.forEach(function (cookie) {
      code.push(util.format('CookieJar.add("%s=%s","%s");', encodeURIComponent(cookie.name), encodeURIComponent(cookie.value), source.url))
    })

    code.push('req.jar(CookieJar);')
    code.push(null)
  }

  if (Object.keys(source.queryObj).length) {
    code.push(util.format('req.query(%s);', JSON.stringify(source.queryObj, null, opts.indent)))
    code.push(null)
  }

  if (Object.keys(source.headersObj).length) {
    code.push(util.format('req.headers(%s);', JSON.stringify(source.headersObj, null, opts.indent)))
    code.push(null)
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      if (source.postData.paramsObj) {
        code.push(util.format('req.form(%s);', JSON.stringify(source.postData.paramsObj, null, opts.indent)))
      }
      break

    case 'application/json':
      if (source.postData.jsonObj) {
        code.push('req.type("json");')
        code.push(util.format('req.send(%s);', JSON.stringify(source.postData.jsonObj, null, opts.indent)))
      }
      break

    case 'multipart/form-data':
      var multipart = []

      source.postData.params.forEach(function (param) {
        var part = {}

        if (param.fileName && !param.value) {
          includeFS = true

          part.body = 'fs.createReadStream("' + param.fileName + '")'
        } else if (param.value) {
          part.body = param.value
        }

        if (part.body) {
          if (param.contentType) {
            part['content-type'] = param.contentType
          }

          multipart.push(part)
        }
      })

      code.push(util.format('req.multipart(%s);', JSON.stringify(multipart, null, opts.indent)))
      break

    default:
      if (source.postData.text) {
        code.push(opts.indent + util.format('req.send(%s);', JSON.stringify(source.postData.text, null, opts.indent)))
      }
  }

  if (includeFS) {
    code.unshift('var fs = require("fs");')
  }

  code.push(null)
  code.push('req.end(function (res) {')
  code.push(opts.indent + 'if (res.error) throw new Error(res.error);')
  code.push(null)
  code.push(opts.indent + 'console.log(res.body);')
  code.push('});')
  code.push(null)

  return code.join('\n').replace(/"fs\.createReadStream\(\\\"(.+)\\\"\)\"/, 'fs.createReadStream("$1")')
}

module.exports.info = {
  key: 'unirest',
  title: 'Unirest',
  link: 'http://unirest.io/nodejs.html',
  description: 'Lightweight HTTP Request Client Library'
}
