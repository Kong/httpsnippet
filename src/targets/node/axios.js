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

var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = Object.assign({
    indent: '  '
  }, options)

  var includeFS = false
  var code = new CodeBuilder(opts.indent)

  code.push('const axios = require("axios");')
    .blank()
  // .push('var req = unirest("%s", "%s");', source.method, source.url)
  // .blank()

  let requestOptions = {
    method: `${source.method}`,
    headers: {
      'content-type': `${source.postData.mimeType}`,
      ...(Object.keys(source.headersObj).length && source.headersObj)
    },
    url: `${source.url}`,
  };

  code.push(`axios(${JSON.stringify(requestOptions)})`)
    .blank()

  //TODO implement params
  // if (Object.keys(source.queryObj).length) {
  //   code.push('req.query(%s);', JSON.stringify(source.queryObj, null, opts.indent))
  //     .blank()
  // }

  // if (Object.keys(source.headersObj).length) {
  //   code.push('req.headers(%s);', JSON.stringify(source.headersObj))

  // }

  // switch (source.postData.mimeType) {
  //   case 'application/x-www-form-urlencoded':
  //     if (source.postData.paramsObj) {
  //       code.push('req.form(%s);', JSON.stringify(source.postData.paramsObj, null, opts.indent))
  //     }
  //     break

  //   case 'application/json':
  //     if (source.postData.jsonObj) {
  //       code.push('req.type("json");')
  //         .push('req.send(%s);', JSON.stringify(source.postData.jsonObj, null, opts.indent))
  //     }
  //     break

  //   case 'multipart/form-data':
  //     var multipart = []

  //     source.postData.params.forEach(function (param) {
  //       var part = {}

  //       if (param.fileName && !param.value) {
  //         includeFS = true

  //         part.body = 'fs.createReadStream("' + param.fileName + '")'
  //       } else if (param.value) {
  //         part.body = param.value
  //       }

  //       if (part.body) {
  //         if (param.contentType) {
  //           part['content-type'] = param.contentType
  //         }

  //         multipart.push(part)
  //       }
  //     })

  //     code.push('req.multipart(%s);', JSON.stringify(multipart, null, opts.indent))
  //     break

  //   default:
  //     if (source.postData.text) {
  //       code.push(opts.indent + 'req.send(%s);', JSON.stringify(source.postData.text, null, opts.indent))
  //     }
  // }

  // if (includeFS) {
  //   code.unshift('var fs = require("fs");')
  // }

  // code.blank()
  //   .push('req.end(function (res) {')
  //   .push(1, 'if (res.error) throw new Error(res.error);')
  //   .blank()
  //   .push(1, 'console.log(res.body);')
  //   .push('});')
  //   .blank()

  return code.join().replace(/"fs\.createReadStream\(\\"(.+)\\"\)"/, 'fs.createReadStream("$1")')
}

module.exports.info = {
  key: 'axios',
  title: 'Axios',
  link: 'https://github.com/axios/axios',
  description: 'Promise based HTTP client for the browser and node.js - axios/axios.'
}
