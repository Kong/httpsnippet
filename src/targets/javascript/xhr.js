/**
 * @description
 * HTTP code snippet generator for native XMLHttpRequest
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  ',
    cors: true
  }, options)

  var code = []

  switch (source.postData.mimeType) {
    case 'application/json':
      code.push(util.format('var data = JSON.stringify(%s);', JSON.stringify(source.postData.jsonObj, null, opts.indent)))
      code.push(null)
      break

    case 'multipart/form-data':
      code.push('var data = new FormData();')

      source.postData.params.map(function (param) {
        code.push(util.format('data.append(%s, %s);', JSON.stringify(param.name), JSON.stringify(param.value || param.fileName || '')))
      })

      // remove the contentType header
      if (source.allHeaders['content-type'].indexOf('boundary')) {
        delete source.allHeaders['content-type']
      }

      code.push(null)
      break

    default:
      code.push(util.format('var data = %s;', JSON.stringify(source.postData.text || null)))
      code.push(null)
  }

  code.push('var xhr = new XMLHttpRequest();')

  if (opts.cors) {
    code.push('xhr.withCredentials = true;')
  }

  code.push(null)

  code.push('xhr.addEventListener("readystatechange", function () {\n\tif (this.readyState === this.DONE) {\n\t\tconsole.log(this.responseText);\n\t}\n});'.replace(/\t/g, opts.indent))

  code.push(null)

  code.push(util.format('xhr.open(%s, %s);', JSON.stringify(source.method), JSON.stringify(source.fullUrl)))

  Object.keys(source.allHeaders).map(function (key) {
    code.push(util.format('xhr.setRequestHeader(%s, %s);', JSON.stringify(key), JSON.stringify(source.allHeaders[key])))
  })

  code.push(null)

  code.push('xhr.send(data);')

  return code.join('\n')
}

module.exports.info = {
  key: 'xhr',
  title: 'XMLHttpRequest',
  link: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest',
  description: 'W3C Standard API that provides scripted client functionality'
}
