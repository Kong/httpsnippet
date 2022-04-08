/**
 * @description
 * HTTP code snippet generator for OCaml using CoHTTP.
 *
 * @author
 * @SGrondin
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const CodeBuilder = require('../../helpers/code-builder');

module.exports = function (source, options) {
  const opts = Object.assign(
    {
      indent: '  ',
    },
    options,
  );

  const methods = ['get', 'post', 'head', 'delete', 'patch', 'put', 'options'];
  const code = new CodeBuilder(opts.indent);

  code.push('open Cohttp_lwt_unix').push('open Cohttp').push('open Lwt').blank().push(`let uri = Uri.of_string "${source.fullUrl}" in`);

  // Add headers, including the cookies
  const headers = Object.keys(source.allHeaders);

  if (headers.length === 1) {
    code.push(`let headers = Header.add (Header.init ()) "${headers[0]}" "${source.allHeaders[headers[0]]}" in`);
  } else if (headers.length > 1) {
    code.push('let headers = Header.add_list (Header.init ()) [');

    headers.forEach(function (key) {
      code.push(`("${key}", "${source.allHeaders[key]}");`, 1);
    });

    code.push('] in');
  }

  // Add body
  if (source.postData.text) {
    // Just text
    code.push(`let body = Cohttp_lwt_body.of_string ${JSON.stringify(source.postData.text)} in`);
  }

  // Do the request
  code.blank();

  const h = headers.length ? '~headers ' : '';
  const b = source.postData.text ? '~body ' : '';
  const m = methods.indexOf(source.method.toLowerCase()) >= 0 ? '`' + source.method.toUpperCase() : '(Code.method_of_string "' + source.method + '")';

  code.push(`Client.call ${h}${b}${m} uri`);

  // Catch result
  code.push('>>= fun (res, body_stream) ->').push('(* Do stuff with the result *)', 1);

  return code.join();
};

module.exports.info = {
  key: 'cohttp',
  title: 'CoHTTP',
  link: 'https://github.com/mirage/ocaml-cohttp',
  description: 'Cohttp is a very lightweight HTTP server using Lwt or Async for OCaml',
};
