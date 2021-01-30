/**
 * @description
 * HTTP code snippet generator for Clojure using clj-http.
 *
 * @author
 * @tggreene
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const CodeBuilder = require('../../helpers/code-builder')
const helpers = require('../../helpers/headers')

const Keyword = function (name) {
  this.name = name
}

Keyword.prototype.toString = function () {
  return ':' + this.name
}

const File = function (path) {
  this.path = path
}

File.prototype.toString = function () {
  return '(clojure.java.io/file "' + this.path + '")'
}

const jsType = function (x) {
  return (typeof x !== 'undefined')
    ? x.constructor.name.toLowerCase()
    : null
}

const objEmpty = function (x) {
  return (jsType(x) === 'object')
    ? Object.keys(x).length === 0
    : false
}

const filterEmpty = function (m) {
  Object.keys(m)
    .filter(function (x) { return objEmpty(m[x]) })
    .forEach(function (x) { delete m[x] })
  return m
}

const padBlock = function (x, s) {
  const padding = Array.apply(null, Array(x))
    .map(function (_) {
      return ' '
    })
    .join('')
  return s.replace(/\n/g, '\n' + padding)
}

const jsToEdn = function (js) {
  switch (jsType(js)) {
    case 'string':
      return '"' + js.replace(/"/g, '\\"') + '"'
    case 'file':
      return js.toString()
    case 'keyword':
      return js.toString()
    case 'null':
      return 'nil'
    case 'regexp':
      return '#"' + js.source + '"'
    case 'object': { // simple vertical format
      const obj = Object.keys(js)
        .reduce(function (acc, key) {
          const val = padBlock(key.length + 2, jsToEdn(js[key]))
          return acc + ':' + key + ' ' + val + '\n '
        }, '')
        .trim()
      return '{' + padBlock(1, obj) + '}'
    }
    case 'array': { // simple horizontal format
      const arr = js.reduce(function (acc, val) {
        return acc + ' ' + jsToEdn(val)
      }, '').trim()
      return '[' + padBlock(1, arr) + ']'
    }
    default: // 'number' 'boolean'
      return js.toString()
  }
}

module.exports = function (source, options) {
  const code = new CodeBuilder(options)
  const methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options']

  if (methods.indexOf(source.method.toLowerCase()) === -1) {
    return code.push('Method not supported').join()
  }

  const params = {
    headers: source.allHeaders,
    'query-params': source.queryObj
  }

  switch (source.postData.mimeType) {
    case 'application/json':
      params['content-type'] = new Keyword('json')
      params['form-params'] = source.postData.jsonObj
      delete params.headers[helpers.getHeaderName(params.headers, 'content-type')]
      break
    case 'application/x-www-form-urlencoded':
      params['form-params'] = source.postData.paramsObj
      delete params.headers[helpers.getHeaderName(params.headers, 'content-type')]
      break
    case 'text/plain':
      params.body = source.postData.text
      delete params.headers[helpers.getHeaderName(params.headers, 'content-type')]
      break
    case 'multipart/form-data':
      params.multipart = source.postData.params.map(function (x) {
        if (x.fileName && !x.value) {
          return {
            name: x.name,
            content: new File(x.fileName)
          }
        } else {
          return {
            name: x.name,
            content: x.value
          }
        }
      })
      delete params.headers[helpers.getHeaderName(params.headers, 'content-type')]
      break
  }

  switch (helpers.getHeader(params.headers, 'accept')) {
    case 'application/json':
      params.accept = new Keyword('json')
      delete params.headers[helpers.getHeaderName(params.headers, 'accept')]
      break
  }

  code.push('(require \'[clj-http.client :as client])\n')

  if (objEmpty(filterEmpty(params))) {
    code.push('(client/%s "%s")', source.method.toLowerCase(), source.url)
  } else {
    code.push('(client/%s "%s" %s)', source.method.toLowerCase(), source.url, padBlock(11 + source.method.length + source.url.length, jsToEdn(filterEmpty(params))))
  }

  return code.join()
}

module.exports.info = {
  key: 'clj_http',
  title: 'clj-http',
  link: 'https://github.com/dakrone/clj-http',
  description: 'An idiomatic clojure http client wrapping the apache client.'
}
