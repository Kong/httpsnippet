'use strict'

var util = require('util')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  ',
    noTags: false,
    maxRedirects: 10,
    timeout: 30,
    namedErrors: false,
    closingTag: false
  }, options)

  var code = []

  if (!opts.noTags) {
    code.push('<?php')
    code.push(null)
  }

  code.push('$curl = curl_init();')
  code.push(null)

  var curlOptions = [{
    escape: true,
    name: 'CURLOPT_PORT',
    value: source.uriObj.port
    }, {
    escape: true,
    name: 'CURLOPT_URL',
    value: source.fullUrl
    }, {
    escape: false,
    name: 'CURLOPT_RETURNTRANSFER',
    value: 'true'
    }, {
    escape: true,
    name: 'CURLOPT_ENCODING',
    value: ''
    }, {
    escape: false,
    name: 'CURLOPT_MAXREDIRS',
    value: opts.maxRedirects
    }, {
    escape: false,
    name: 'CURLOPT_TIMEOUT',
    value: opts.timeout
    }, {
    escape: false,
    name: 'CURLOPT_HTTP_VERSION',
    value: source.httpVersion === 'HTTP/1.0' ? 'CURL_HTTP_VERSION_1_0' : 'CURL_HTTP_VERSION_1_1'
    }, {
    escape: true,
    name: 'CURLOPT_CUSTOMREQUEST',
    value: source.method
    }, {
    escape: true,
    name: 'CURLOPT_POSTFIELDS',
    value: source.postData ? source.postData.text : undefined
  }]

  code.push('curl_setopt_array($curl, array(')

  var curlopts = []

  curlOptions.map(function (option) {
    if (!~[null, undefined].indexOf(option.value)) {
      curlopts.push(util.format('%s => %s,', option.name, option.escape ? JSON.stringify(option.value) : option.value))
    }
  })

  // construct cookies
  var cookies = source.cookies.map(function (cookie) {
    return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value)
  })

  if (cookies.length) {
    curlopts.push(util.format('CURLOPT_COOKIE => "%s",', cookies.join('; ')))
  }

  // construct cookies
  var headers = Object.keys(source.headersObj).sort().map(function (key) {
    return util.format('"%s: %s"', key, source.headersObj[key])
  })

  if (headers.length) {
    curlopts.push(util.format('CURLOPT_HTTPHEADER => array(\n%s%s%s\n%s),', opts.indent, opts.indent, headers.join(',\n' + opts.indent + opts.indent), opts.indent))
  }

  code.push(opts.indent + curlopts.join('\n' + opts.indent))

  code.push('));')
  code.push(null)
  code.push('$response = curl_exec($curl);')
  code.push('$err = curl_error($curl);')
  code.push(null)
  code.push('curl_close($curl);')
  code.push(null)
  code.push('if ($err) {')

  if (opts.namedErrors) {
    code.push(opts.indent + 'echo array_flip(get_defined_constants(true)["curl"])[$err];')
  } else {
    code.push(opts.indent + 'echo "cURL Error #:" . $err;')
  }

  code.push('} else {')
  code.push(opts.indent + 'print_r($response);')
  code.push('}')

  if (opts.closingTag) {
    code.push(null)
    code.push('?>')
  }

  return code.join('\n')
}

module.exports.info = {
  key: 'curl',
  title: 'cURL',
  link: 'http://php.net/manual/en/book.curl.php',
  description: 'PHP with libcurl'
}
