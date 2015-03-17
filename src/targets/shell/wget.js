/**
 * @description
 * HTTP code snippet generator for the Shell using Wget.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var shell = require('../../helpers/shell')

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

  code.push(util.format('--method %s', shell.quote(source.method)))

  Object.keys(source.allHeaders).map(function (key) {
    var header = util.format('%s: %s', key, source.allHeaders[key])
    code.push(util.format('--header %s', shell.quote(header)))
  })

  if (source.postData.text) {
    code.push('--body-data ' + shell.escape(shell.quote(source.postData.text)))
  }

  code.push(opts.short ? '-O' : '--output-document')

  code.push(util.format('- %s', shell.quote(source.fullUrl)))

  return code.join(opts.indent !== false ? ' \\\n' + opts.indent : ' ')
}

module.exports.info = {
  key: 'wget',
  title: 'Wget',
  link: 'https://www.gnu.org/software/wget/',
  description: 'a free software package for retrieving files using HTTP, HTTPS'
}
