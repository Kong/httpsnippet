/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const helpers = require('./helpers');
const CodeBuilder = require('../../helpers/code-builder');

module.exports = function (source, options) {
  const opts = Object.assign(
    {
      closingTag: false,
      indent: '  ',
      noTags: false,
      shortTags: false,
    },
    options,
  );

  const code = new CodeBuilder(opts.indent);

  if (!opts.noTags) {
    code.push(opts.shortTags ? '<?' : '<?php').blank();
  }

  if (!~helpers.methods.indexOf(source.method.toUpperCase())) {
    code.push(`HttpRequest::methodRegister('${source.method}');`);
  }

  code.push('$request = new HttpRequest();').push(`$request->setUrl(${helpers.convert(source.url)});`);

  if (~helpers.methods.indexOf(source.method.toUpperCase())) {
    code.push(`$request->setMethod(HTTP_METH_${source.method.toUpperCase()});`);
  } else {
    code.push(`$request->setMethod(HttpRequest::HTTP_METH_${source.method.toUpperCase()});`);
  }

  code.blank();

  if (Object.keys(source.queryObj).length) {
    code.push(`$request->setQueryData(${helpers.convert(source.queryObj, opts.indent)});`).blank();
  }

  if (Object.keys(source.headersObj).length) {
    code.push(`$request->setHeaders(${helpers.convert(source.headersObj, opts.indent)});`).blank();
  }

  if (Object.keys(source.cookiesObj).length) {
    code.push(`$request->setCookies(${helpers.convert(source.cookiesObj, opts.indent)});`).blank();
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      code
        .push(`$request->setContentType(${helpers.convert(source.postData.mimeType)});`)
        .push(`$request->setPostFields(${helpers.convert(source.postData.paramsObj, opts.indent)});`)
        .blank();
      break;

    default:
      if (source.postData.text) {
        code.push(`$request->setBody(${helpers.convert(source.postData.text)});`).blank();
      }
  }

  code
    .push('try {')
    .push('$response = $request->send();', 1)
    .blank()
    .push('echo $response->getBody();', 1)
    .push('} catch (HttpException $ex) {')
    .push('echo $ex;', 1)
    .push('}');

  if (!opts.noTags && opts.closingTag) {
    code.blank().push('?>');
  }

  return code.join();
};

module.exports.info = {
  key: 'http1',
  title: 'HTTP v1',
  link: 'http://php.net/manual/en/book.http.php',
  description: 'PHP with pecl/http v1',
};
