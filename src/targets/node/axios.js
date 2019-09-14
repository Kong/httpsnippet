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

function contentBodyFactory(contentType, postData, includeFS = false) {
  switch (contentType) {
    case 'application/x-www-form-urlencoded':
      return [postData.paramsObj, includeFS]
    case 'application/json':
      return [postData.jsonObj, includeFS]
    case 'multipart/form-data':
      let multipart = []

      postData.params.forEach((param) => {
        let part = {}

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
      return [multipart, includeFS]
    default:
      if (postData.text) {
        return [postData.text, includeFS]
      }
      return [null, includeFS]
  }

}
module.exports = function (source, options) {
  let opts = Object.assign({
    indent: '  '
  }, options)


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
  const { postData } = source
  const { mimeType } = postData
  const [data, includeFS] = contentBodyFactory(mimeType, postData)
  if (data) {
    requestOptions['data'] = data
  }
  if (includeFS) {
    code.unshift('const fs = require("fs");')
  }
  const formatedOptions = JSON.stringify(requestOptions).replace(/{/g, `{
    `)
  code.push(`axios(${
    formatedOptions
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
