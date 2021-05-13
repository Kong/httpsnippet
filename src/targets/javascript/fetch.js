/**
 * @description
 * HTTP code snippet generator for fetch
 *
 * @author
 * @pmdroid
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const stringifyObject = require('stringify-object')
const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  const opts = Object.assign(
    {
      indent: '  ',
      credentials: null
    },
    options
  )

  const code = new CodeBuilder(opts.indent)

  options = {
    method: source.method
  }

  if (Object.keys(source.allHeaders).length) {
    options.headers = source.allHeaders
  }

  if (opts.credentials !== null) {
    options.credentials = opts.credentials
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      options.body = source.postData.paramsObj
        ? source.postData.paramsObj
        : source.postData.text
      break

    case 'application/json':
      if (source.postData.jsonObj) {
        options.body = opts.useObjectBody ? source.postData.jsonObj : JSON.stringify(source.postData.jsonObj)
      }
      break

    case 'multipart/form-data':
      code.push('const form = new FormData();')

      source.postData.params.forEach(function (param) {
        code.push(
          'form.append(%s, %s);',
          JSON.stringify(param.name),
          JSON.stringify(param.value || param.fileName || '')
        )
      })

      code.blank()
      break

    default:
      if (source.postData.text) {
        options.body = source.postData.text
      }
  }

  code.push('const options = %s;', stringifyObject(options, {
    indent: opts.indent,
    inlineCharacterLimit: 80,

    // The Fetch API body only accepts string parameters, but stringified JSON can be difficult to
    // read, so if you pass the `useObjectBody` option we keep the object as a literal and use
    // this transform function to wrap the literal in a `JSON.stringify` call.
    transform: (object, property, originalResult) => {
      if (property === 'body') {
        if (source.postData.mimeType === 'application/x-www-form-urlencoded') {
          return `new URLSearchParams(${originalResult})`
        }

        if (opts.useObjectBody) {
          if (source.postData.mimeType === 'application/json') {
            return 'JSON.stringify(' + originalResult + ')'
          }
        }
      }

      return originalResult
    }
  }))
    .blank()

  if (source.postData.mimeType === 'multipart/form-data') {
    code.push('options.body = form;')
      .blank()
  }

  code.push("fetch('%s', options)", source.fullUrl)
    .push(1, '.then(response => response.json())')
    .push(1, '.then(response => console.log(response))')
    .push(1, '.catch(err => console.error(err));')

  return code.join()
}

module.exports.info = {
  key: 'fetch',
  title: 'fetch',
  link: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
  description: 'Perform asynchronous HTTP requests with the Fetch API'
}
