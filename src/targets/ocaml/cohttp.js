'use strict'

var util = require('util')

module.exports = function (source, options) {
  var opts = util._extend({
    indent: '  '
  }, options)

  var code = []

  code.push('open Cohttp_lwt_unix')
  code.push('open Lwt')
  code.push('')

  // Create URI
  code.push(util.format('let uri = Uri.of_string "%s" in', source.fullUrl))

  // Add headers, including the cookies
  var headers = Object.keys(source.allHeaders)

  if (headers.length) {
    code.push('let headers = Header.init ()')

    headers.map(function (key) {
      code.push(util.format(opts.indent + '|> fun h -> Header.add h "%s" "%s"', key, source.allHeaders[key]))
    })

    code.push('in')
  }

  // Add body
  if (source.postData.text) {
    // Just text
    code.push(util.format('let body = %s in', JSON.stringify(source.postData.text)))
  }

  // Do the request
  code.push('')

  code.push(util.format('Client.call %s%s(Code.method_of_string "%s") uri',
    headers.length ? '~headers ' : '',
    source.postData.text ? '~body ' : '',
    source.method
  ))

  // Catch result
  code.push('>>= fun (res, body_stream) ->')
  code.push(opts.indent + '(* Do stuff with the result *)')

  return code.join('\n')
}

module.exports.info = {
  key: 'cohttp',
  title: 'CoHTTP',
  link: 'https://github.com/mirage/ocaml-cohttp',
  description: 'Cohttp is a very lightweight HTTP server using Lwt or Async for OCaml'
}
