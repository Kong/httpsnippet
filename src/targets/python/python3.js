/**
 * @description
 * HTTP code snippet generator for native Python3.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  const code = new CodeBuilder()
  // Start Request
  code.push('import http.client')
    .blank()

  // Check which protocol to be used for the client connection
  const protocol = source.uriObj.protocol
  if (protocol === 'https:') {
    code.push('conn = http.client.HTTPSConnection("%s")', source.uriObj.host)
      .blank()
  } else {
    code.push('conn = http.client.HTTPConnection("%s")', source.uriObj.host)
      .blank()
  }

  // Create payload string if it exists
  const payload = JSON.stringify(source.postData.text)
  if (payload) {
    code.push('payload = %s', payload)
      .blank()
  }

  // Create Headers
  const headers = source.allHeaders
  const headerCount = Object.keys(headers).length
  if (headerCount === 1) {
    for (const header in headers) {
      code.push('headers = { \'%s\': "%s" }', header, headers[header])
        .blank()
    }
  } else if (headerCount > 1) {
    let count = 1

    code.push('headers = {')

    for (const header in headers) {
      if (count++ !== headerCount) {
        code.push('    \'%s\': "%s",', header, headers[header])
      } else {
        code.push('    \'%s\': "%s"', header, headers[header])
      }
    }

    code.push('    }')
      .blank()
  }

  // Make Request
  const method = source.method
  const path = source.uriObj.path
  if (payload && headerCount) {
    code.push('conn.request("%s", "%s", payload, headers)', method, path)
  } else if (payload && !headerCount) {
    code.push('conn.request("%s", "%s", payload)', method, path)
  } else if (!payload && headerCount) {
    code.push('conn.request("%s", "%s", headers=headers)', method, path)
  } else {
    code.push('conn.request("%s", "%s")', method, path)
  }

  // Get Response
  code.blank()
    .push('res = conn.getresponse()')
    .push('data = res.read()')
    .blank()
    .push('print(data.decode("utf-8"))')

  return code.join()
}

module.exports.info = {
  key: 'python3',
  title: 'http.client',
  link: 'https://docs.python.org/3/library/http.client.html',
  description: 'Python3 HTTP Client'
}
