'use strict'

var util = require('util')

module.exports = function (source, options) {
  var opts = util._extend({
    short: false,
    indent: '  '
  }, options)

  var code = []

  code.push(util.format('curl %s %s', opts.short ? '-X' : '--request', source.method))

  code.push(util.format('%s"%s"', opts.short ? '' : '--url ', source.fullUrl))

  if (source.httpVersion === 'HTTP/1.0') {
    code.push(opts.short ? '-0' : '--http1.0')
  }

  // construct headers
  Object.keys(source.headersObj).sort().map(function (key) {
    code.push(util.format('%s "%s: %s"', opts.short ? '-H' : '--header', key, source.headersObj[key]))
  })

  if (source.allHeaders.cookie) {
    code.push(util.format('%s "%s"', opts.short ? '-b' : '--cookie', source.allHeaders.cookie))
  }

  // request body
  if (source.postData.text) {
    code.push(util.format('%s %s', opts.short ? '-d' : '--data', JSON.stringify(source.postData.text)))
  }

  // construct post params
  if (!source.postData.text && source.postData.params) {
    source.postData.params.map(function (param) {
      code.push(util.format('%s "%s=%s"', opts.short ? '-F' : '--form', param.name, param.value))
    })
  }

  return code.join(opts.indent !== false ? ' \\\n' + opts.indent : ' ')
}

module.exports.info = {
  key: 'curl',
  title: 'cURL',
  link: 'http://curl.haxx.se/',
  description: 'curl is a command line tool and library for transferring data with URL syntax',
  extname: '.sh'
}
