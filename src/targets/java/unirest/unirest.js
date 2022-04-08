/**
 * @description
 * HTTP code snippet generator for Java using Unirest.
 *
 * @author
 * @shashiranjan84
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

  const code = new CodeBuilder(opts.indent);

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

  if (methods.indexOf(source.method.toUpperCase()) === -1) {
    code.push(`HttpResponse<String> response = Unirest.customMethod("${source.method.toUpperCase()}","${source.fullUrl}")`);
  } else {
    code.push(`HttpResponse<String> response = Unirest.${source.method.toLowerCase()}("${source.fullUrl}")`);
  }

  // Add headers, including the cookies
  const headers = Object.keys(source.allHeaders);

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(`.header("${key}", "${source.allHeaders[key]}")`, 1);
    });
  }

  if (source.postData.text) {
    code.push(`.body(${JSON.stringify(source.postData.text)})`, 1);
  }

  code.push('.asString();', 1);

  return code.join();
};

module.exports.info = {
  key: 'unirest',
  title: 'Unirest',
  link: 'http://unirest.io/java.html',
  description: 'Lightweight HTTP Request Client Library',
};
