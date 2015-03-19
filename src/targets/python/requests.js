/**
 * @description
 * HTTP code snippet generator for Requests
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')

module.exports = function (source, options) {
  // Start snippet
  var code = []

  // Import requests
  code.push('import requests\n')

  // Set URL
  code.push(util.format('url = "%s"\n', source.url))

  // Construct query string
  if (source.queryString.length) {
    var qs = 'querystring = {'
    for (var i = 0; i < source.queryString.length; i++) {
      for (var key in source.queryString[i]) {
        qs += "'" + key + "':" + "'" + source.queryString[i][key] + "',"
      }
    }
    qs = qs.substring(0, qs.length - 1)
    qs += '}\n'
    code.push(qs)
  }

  // Construct payload
  var payload = JSON.stringify(source.postData.text)
  if (payload) {
    code.push(util.format('payload = %s', payload))
  }

  // Construct headers
  var header
  var headers = source.allHeaders
  var headerCount = Object.keys(headers).length
  if (headerCount === 1) {
    for (header in headers) {
      code.push(util.format('headers = {\'%s\': \'%s\'}\n', header, headers[header]))
    }
  } else if (headerCount > 1) {
    var headerLine
    var count = 1
    code.push('headers = {')
    for (header in headers) {
      if (count++ !== headerCount) {
        headerLine = util.format('    \'%s\': "%s",', header, headers[header])
      } else {
        headerLine = util.format('    \'%s\': "%s"', header, headers[header])
      }
      code.push(headerLine)
    }
    code.push('    }\n')
  }

  // Construct request
  var method = source.method
  var request = util.format('response = requests.request("%s", url', method)
  if (payload) request += ', data=payload'
  if (headerCount > 0) request += ', headers=headers'
  if (qs) request += ', params=querystring'
  request += ')\n'
  code.push(request)

  // Print response
  code.push('print(response.text)')

  console.log(code.join('\n'))
  return code.join('\n')
}

module.exports.info = {
  key: 'requests',
  title: 'Requests',
  link: 'http://docs.python-requests.org/en/latest/api/#requests.request',
  description: 'Requests HTTP library'
}

// response = requests.request("POST", url, data=payload, headers=headers, params=querystring)
