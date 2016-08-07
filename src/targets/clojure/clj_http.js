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

var CodeBuilder = require('../../helpers/code-builder')

class Keyword {
  constructor (name) {
    this.name = `:${name}`
  }

  toString () {
    return this.name
  }
}

class ClojureFile {
  constructor (path) {
    this.path = `(clojure.java.io/file "${path}")`
  }

  toString () {
    return this.path
  }
}

var jsType = x => (typeof x !== 'undefined')
                    ? x.constructor.name.toLowerCase()
                    : null

var objEmpty = x => (jsType(x) !== 'object')
                      ? false
                      : Object.keys(x).length === 0

var filterEmpty = function (m) {
  Object.keys(m)
        .filter(x => objEmpty(m[x]))
        .forEach(x => delete m[x])
  return m
}

var padBlock = function (x, s) {
  var padding = [...Array(x)].map(() => ' ').join('')
  return s.replace(/\n/g, `\n${padding}`)
}

var jsToEdn = function (js) {
  switch (jsType(js)) {
    default: // 'number' 'boolean'
      return js.toString()
    case 'string':
      return `"${js.replace(/\"/g, '\\"')}"`
    case 'clojurefile':
      return js.toString()
    case 'keyword':
      return js.toString()
    case 'null':
      return 'nil'
    case 'regexp':
      return `#"${js.source}"`
    case 'object': // simple vertical format
      var obj = Object.keys(js)
                      .reduce((acc, key) => {
                        var val = padBlock(key.length + 2, jsToEdn(js[key]))
                        return `${acc}:${key} ${val}\n `
                      }, '')
                      .trim()
      return `{${padBlock(1, obj)}}`
    case 'array': // simple horizontal format
      var arr = js.reduce((acc, val) => `${acc} ${jsToEdn(val)}`, '').trim()
      return `[${padBlock(1, arr)}]`
  }
}

module.exports = function (source, options) {
  var code = new CodeBuilder(options)
  var methods = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options']

  if (methods.indexOf(source.method.toLowerCase()) === -1) {
    return code.push('Method not supported').join()
  }

  var params = {headers: source.allHeaders,
                'query-params': source.queryObj}

  switch (source.postData.mimeType) {
    case 'application/json':
      params['content-type'] = new Keyword('json')
      params['form-params'] = source.postData.jsonObj
      delete params.headers['content-type']
      break
    case 'application/x-www-form-urlencoded':
      params['form-params'] = source.postData.paramsObj
      delete params.headers['content-type']
      break
    case 'text/plain':
      params.body = source.postData.text
      delete params.headers['content-type']
      break
    case 'multipart/form-data':
      params.multipart = source.postData.params.map(x => {
        if (x.fileName && !x.value) {
          return {name: x.name,
                  content: new ClojureFile(x.fileName)}
        } else {
          return {name: x.name,
                  content: x.value}
        }
      })
      delete params.headers['content-type']
      break
  }

  switch (params.headers.accept) {
    case 'application/json':
      params.accept = new Keyword('json')
      delete params.headers.accept
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
