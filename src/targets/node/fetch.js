/**
 * @description
 * HTTP code snippet generator for Node.js using node-fetch.
 *
 * @author
 * @hirenoble
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const stringifyObject = require('stringify-object')
const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  '
  }, options)

  let includeFS = false
  const code = new CodeBuilder(opts.indent)

  code.push('const fetch = require(\'node-fetch\');')
  const url = source.fullUrl
  const reqOpts = {
    method: source.method
  }

  if (Object.keys(source.headersObj).length) {
    reqOpts.headers = source.headersObj
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      code.unshift('const { URLSearchParams } = require(\'url\');')
      code.push('const encodedParams = new URLSearchParams();')
      code.blank()

      source.postData.params.forEach(function (param) {
        code.push('encodedParams.set(\'' + param.name + '\', \'' + param.value + '\');')
      })

      reqOpts.body = 'encodedParams'
      break

    case 'application/json':
      if (source.postData.jsonObj) {
        reqOpts.body = options.useObjectBody ? source.postData.jsonObj : JSON.stringify(source.postData.jsonObj)
      }
      break

    case 'multipart/form-data':
      code.unshift('const FormData = require(\'form-data\');')
      code.push('const formData = new FormData();')
      code.blank()

      source.postData.params.forEach(function (param) {
        if (!param.fileName && !param.fileName && !param.contentType) {
          code.push('formData.append(\'' + param.name + '\', \'' + param.value + '\');')
          return
        }

        if (param.fileName) {
          includeFS = true
          code.push('formData.append(\'' + param.name + '\', fs.createReadStream(\'' + param.fileName + '\'));')
        }
      })
      break

    default:
      if (source.postData.text) {
        reqOpts.body = source.postData.text
      }
  }

  // construct cookies argument
  if (source.cookies.length) {
    let cookies = ''
    source.cookies.forEach(function (cookie) {
      cookies = cookies + encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value) + '; '
    })

    if (reqOpts.headers) {
      reqOpts.headers.cookie = cookies
    } else {
      reqOpts.headers = {}
      reqOpts.headers.cookie = cookies
    }
  }

  code.blank()
  code.push('const url = \'' + url + '\';')
  code.push('const options = %s;', stringifyObject(reqOpts, {
    indent: opts.indent,
    inlineCharacterLimit: 80,

    // The Fetch API body only accepts string parameters, but stringified JSON can be difficult to
    // read, so if you pass the `useObjectBody` option we keep the object as a literal and use
    // this transform function to wrap the literal in a `JSON.stringify` call.
    transform: (object, property, originalResult) => {
      if (property === 'body' && opts.useObjectBody && source.postData.mimeType === 'application/json') {
        return 'JSON.stringify(' + originalResult + ')'
      }

      return originalResult
    }
  }))
    .blank()

  if (includeFS) {
    code.unshift('const fs = require(\'fs\');')
  }

  if (source.postData.mimeType === 'multipart/form-data') {
    code.push('options.body = formData;')
      .blank()
  }

  code.push('fetch(url, options)')
    .push(1, '.then(res => res.json())')
    .push(1, '.then(json => console.log(json))')
    .push(1, '.catch(err => console.error(\'error:\' + err));')

  return code.join()
    .replace(/'encodedParams'/, 'encodedParams')
    .replace(/"fs\.createReadStream\(\\"(.+)\\"\)"/, 'fs.createReadStream("$1")')
}

module.exports.info = {
  key: 'fetch',
  title: 'Fetch',
  link: 'https://github.com/bitinn/node-fetch',
  description: 'Simplified HTTP node-fetch client'
}
