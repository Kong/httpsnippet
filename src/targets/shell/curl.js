/**
 * @description
 * HTTP code snippet generator for the Shell using cURL.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

const util = require('util')
const helpers = require('./helpers')
const headerHelpers = require('../../helpers/headers')
const CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  const opts = Object.assign({
    indent: '  ',
    short: false,
    binary: false,
    globOff: false,
    escapeBrackets: false
  }, options)

  const code = new CodeBuilder(opts.indent, opts.indent !== false ? ' \\\n' + opts.indent : ' ')

  const globOption = opts.short ? '-g' : '--globoff'
  const requestOption = opts.short ? '-X' : '--request'
  let formattedUrl = helpers.quote(source.fullUrl)

  if (opts.escapeBrackets) {
    formattedUrl = formattedUrl.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
  }

  code.push('curl %s %s', requestOption, source.method)
  if (opts.globOff) {
    formattedUrl = unescape(formattedUrl)
    code.push(globOption)
  }
  code.push(util.format('%s%s', opts.short ? '' : '--url ', formattedUrl))

  if (source.httpVersion === 'HTTP/1.0') {
    code.push(opts.short ? '-0' : '--http1.0')
  }

  // construct headers
  Object.keys(source.headersObj).sort().forEach(function (key) {
    const header = util.format('%s: %s', key, source.headersObj[key])
    code.push('%s %s', opts.short ? '-H' : '--header', helpers.quote(header))
  })

  if (source.allHeaders.cookie) {
    code.push('%s %s', opts.short ? '-b' : '--cookie', helpers.quote(source.allHeaders.cookie))
  }

  // construct post params
  switch (source.postData.mimeType) {
    case 'multipart/form-data':
      source.postData.params.forEach(function (param) {
        let post = ''
        if (param.fileName) {
          post = util.format('%s=@%s', param.name, param.fileName)
        } else {
          post = util.format('%s=%s', param.name, param.value)
        }

        code.push('%s %s', opts.short ? '-F' : '--form', helpers.quote(post))
      })
      break

    case 'application/x-www-form-urlencoded':
      if (source.postData.params) {
        source.postData.params.forEach(function (param) {
          code.push(
            '%s %s', opts.binary ? '--data-binary' : (opts.short ? '-d' : '--data'),
            helpers.quote(util.format('%s=%s', param.name, param.value))
          )
        })
      } else {
        code.push(
          '%s %s', opts.binary ? '--data-binary' : (opts.short ? '-d' : '--data'),
          helpers.quote(source.postData.text)
        )
      }
      break

    default:
      // raw request body
      if (source.postData.text) {
        let builtPayload = false

        // If we're dealing with a JSON variant, and our payload is JSON let's make it look a little nicer.
        if (headerHelpers.isMimeTypeJson(source.postData.mimeType)) {
          // If our postData is less than 20 characters, let's keep it all on one line so as to not make the snippet
          // overly lengthy
          if (source.postData.text.length > 20) {
            try {
              const jsonPayload = JSON.parse(source.postData.text)

              // If the JSON object has a single quote we should prepare it inside of a HEREDOC because the single
              // quote in something like `string's` can't be escaped when used with `--data`.
              //
              // Basically this boils down to `--data @- <<EOF...EOF` vs `--data '...'`.
              builtPayload = true
              code.push(
                source.postData.text.indexOf("'") > 0 ? '%s @- <<EOF\n%s\nEOF' : "%s '\n%s\n'",
                opts.binary ? '--data-binary' : (opts.short ? '-d' : '--data'),
                JSON.stringify(jsonPayload, null, opts.indent)
              )
            } catch (err) {
              // no-op
            }
          }
        }

        if (!builtPayload) {
          code.push(
            '%s %s', opts.binary ? '--data-binary' : (opts.short ? '-d' : '--data'),
            helpers.quote(source.postData.text)
          )
        }
      }
  }

  return code.join()
}

module.exports.info = {
  key: 'curl',
  title: 'cURL',
  link: 'http://curl.haxx.se/',
  description: 'cURL is a command line tool and library for transferring data with URL syntax'
}
