'use strict'

const CodeBuilder = require('../../helpers/code-builder')
const helpers = require('../../helpers/headers')

function getDecompressionMethods (source) {
  const acceptEncoding = helpers.getHeader(source.allHeaders, 'accept-encoding')
  if (!acceptEncoding) {
    return [] // no decompression
  }

  const supportedMethods = {
    gzip: 'DecompressionMethods.GZip',
    deflate: 'DecompressionMethods.Deflate'
  }
  const methods = []
  acceptEncoding.split(',').forEach(function (encoding) {
    const match = /\s*([^;\s]+)/.exec(encoding)
    if (match) {
      const method = supportedMethods[match[1]]
      if (method) {
        methods.push(method)
      }
    }
  })

  return methods
}

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '    '
  }, options)

  const code = new CodeBuilder(opts.indent)

  let clienthandler = ''
  const cookies = !!source.allHeaders.cookie
  const decompressionMethods = getDecompressionMethods(source)
  if (cookies || decompressionMethods.length) {
    clienthandler = 'clientHandler'
    code.push('var clientHandler = new HttpClientHandler')
    code.push('{')
    if (cookies) {
      // enable setting the cookie header
      code.push(1, 'UseCookies = false,')
    }
    if (decompressionMethods.length) {
      // enable decompression for supported methods
      code.push(1, 'AutomaticDecompression = %s,', decompressionMethods.join(' | '))
    }
    code.push('};')
  }

  code.push('var client = new HttpClient(%s);', clienthandler)

  code.push('var request = new HttpRequestMessage')
  code.push('{')

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE']
  let method = source.method.toUpperCase()
  if (method && (methods.indexOf(method) !== -1)) {
    // buildin method
    method = `HttpMethod.${method[0]}${method.substring(1).toLowerCase()}`
  } else {
    // custom method
    method = `new HttpMethod("${method}")`
  }
  code.push(1, 'Method = %s,', method)

  code.push(1, 'RequestUri = new Uri("%s"),', source.fullUrl)

  const headers = Object.keys(source.allHeaders).filter(function (header) {
    switch (header.toLowerCase()) {
      case 'content-type':
      case 'content-length':
      case 'accept-encoding':
        // skip these headers
        return false
      default:
        return true
    }
  })
  if (headers.length) {
    code.push(1, 'Headers =')
    code.push(1, '{')
    headers.forEach(function (key) {
      code.push(2, '{ "%s", "%s" },', key, source.allHeaders[key])
    })
    code.push(1, '},')
  }

  if (source.postData.text) {
    const contentType = source.postData.mimeType
    switch (contentType) {
      case 'application/x-www-form-urlencoded':
        code.push(1, 'Content = new FormUrlEncodedContent(new Dictionary<string, string>')
        code.push(1, '{')
        source.postData.params.forEach(function (param) {
          code.push(2, '{ "%s", "%s" },', param.name, param.value)
        })
        code.push(1, '}),')
        break
      case 'multipart/form-data':
        code.push(1, 'Content = new MultipartFormDataContent')
        code.push(1, '{')
        source.postData.params.forEach(function (param) {
          code.push(2, 'new StringContent(%s)', JSON.stringify(param.value || ''))
          code.push(2, '{')
          code.push(3, 'Headers =')
          code.push(3, '{')
          if (param.contentType) {
            code.push(4, 'ContentType = new MediaTypeHeaderValue("%s"),', param.contentType)
          }
          code.push(4, 'ContentDisposition = new ContentDispositionHeaderValue("form-data")')
          code.push(4, '{')
          code.push(5, 'Name = "%s",', param.name)
          if (param.fileName) {
            code.push(5, 'FileName = "%s",', param.fileName)
          }
          code.push(4, '}')
          code.push(3, '}')
          code.push(2, '},')
        })

        code.push(1, '},')
        break
      default:
        code.push(1, 'Content = new StringContent(%s)', JSON.stringify(source.postData.text || ''))
        code.push(1, '{')
        code.push(2, 'Headers =')
        code.push(2, '{')
        code.push(3, 'ContentType = new MediaTypeHeaderValue("%s")', contentType)
        code.push(2, '}')
        code.push(1, '}')
        break
    }
  }
  code.push('};')

  // send and read response
  code.push('using (var response = await client.SendAsync(request))')
  code.push('{')
  code.push(1, 'response.EnsureSuccessStatusCode();')
  code.push(1, 'var body = await response.Content.ReadAsStringAsync();')
  code.push(1, 'Console.WriteLine(body);')
  code.push('}')

  return code.join()
}

module.exports.info = {
  key: 'httpclient',
  title: 'HttpClient',
  link: 'https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient',
  description: '.NET Standard HTTP Client'
}
