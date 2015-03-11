'use strict'

var util = require('util')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  ',
    short: false,
    verbose: false
  }, options)

  var code = []

  if (opts.verbose) {
    code.push(util.format('wget %s', opts.short ? '-v' : '--verbose'))
  } else {
    code.push(util.format('wget %s', opts.short ? '-q' : '--quiet'))
  }

  code.push(util.format('--method %s', source.method))

  Object.keys(source.allHeaders).map(function (key) {
    code.push(util.format('--header "%s: %s"', key, source.allHeaders[key]))
  })

  if (source.postData.text) {
    code.push('--body-data ' + JSON.stringify(source.postData.text))
  }

  code.push(opts.short ? '-O' : '--output-document')

  code.push(util.format('- "%s"', source.fullUrl))

  return code.join(opts.indent !== false ? ' \\\n' + opts.indent : ' ')
}

module.exports.info = {
  key: 'wget',
  title: 'Wget',
  link: 'https://www.gnu.org/software/wget/',
  description: 'a free software package for retrieving files using HTTP, HTTPS',
  extname: '.sh'
}
