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

var util = require('util')
var shell = require('../../helpers/shell')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = util._extend({
    short: false,
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent, opts.indent !== false ? ' \\\n' + opts.indent : ' ')

  code.push(util.format('curl %s %s', opts.short ? '-X' : '--request', source.method))
      .push(util.format('%s%s', opts.short ? '' : '--url ', shell.quote(source.fullUrl)))

  if (source.httpVersion === 'HTTP/1.0') {
    code.push(opts.short ? '-0' : '--http1.0')
  }

  // construct headers
  Object.keys(source.headersObj).sort().map(function (key) {
    var header = util.format('%s: %s', key, source.headersObj[key])
    code.push(util.format('%s %s', opts.short ? '-H' : '--header', shell.quote(header)))
  })

  if (source.allHeaders.cookie) {
    code.push(util.format('%s %s', opts.short ? '-b' : '--cookie', shell.quote(source.allHeaders.cookie)))
  }

  // request body
  if (source.postData.text) {
    code.push(util.format('%s %s', opts.short ? '-d' : '--data', shell.escape(shell.quote(source.postData.text))))
  }

  // construct post params
  if (!source.postData.text && source.postData.params) {
    source.postData.params.map(function (param) {
      var post = util.format('%s=%s', param.name, param.value)
      code.push(util.format('%s %s', opts.short ? '-F' : '--form', shell.quote(post)))
    })
  }

  return code.join()
}

module.exports.info = {
  key: 'curl',
  title: 'cURL',
  link: 'http://curl.haxx.se/',
  description: 'curl is a command line tool and library for transferring data with URL syntax'
}
