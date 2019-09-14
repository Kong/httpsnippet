/**
 * @description
 * HTTP code snippet generator for Node.js using Unirest.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

let CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  let opts = Object.assign({
    indent: '  '
  }, options)

  let includeFS = false
  let code = new CodeBuilder(opts.indent)

  code.push('const axios = require("axios");')
    .blank()

  const requestOptions = {
    method: `${source.method}`,
    headers: {
      'content-type': `${source.postData.mimeType}`,
      ...(Object.keys(source.headersObj).length && source.headersObj)
    },
    params: Object.keys(source.queryObj).length ? source.queryObj : undefined,
    url: `${source.url}`
  };

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      if (source.postData.paramsObj) {
        code.push('req.form(%s);', JSON.stringify(source.postData.paramsObj, null, opts.indent))
      }
      break

    case 'application/json':
      if (source.postData.jsonObj) {
        code.push('req.type("json");')
          .push('req.send(%s);', JSON.stringify(source.postData.jsonObj, null, opts.indent))
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

      code.push('req.multipart(%s);', JSON.stringify(multipart, null, opts.indent))
      break

    default:
      if (source.postData.text) {
        code.push(opts.indent + 'req.send(%s);', JSON.stringify(source.postData.text, null, opts.indent))
      }
  }

  // if (includeFS) {
  //   code.unshift('var fs = require("fs");')
  // }
  code.push(`axios(${
    JSON.stringify(requestOptions)
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })`)

  return code.join().replace(/"fs\.createReadStream\(\\"(.+)\\"\)"/, 'fs.createReadStream("$1")')
}

module.exports.info = {
  key: 'axios',
  title: 'Axios',
  link: 'https://github.com/axios/axios',
  description: 'Promise based HTTP client for the browser and node.js - axios/axios.'
}
