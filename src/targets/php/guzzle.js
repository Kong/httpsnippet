/**
 * @description
 * HTTP code snippet generator for PHP using Guzzle.
 *
 * @author
 * @RobertoArruda
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const { format } = require('util');
const helpers = require('./helpers');
const headerHelpers = require('../../helpers/headers');
const CodeBuilder = require('../../helpers/code-builder');

module.exports = function (source, options) {
  const opts = {
    closingTag: false,
    indent: '  ',
    noTags: false,
    shortTags: false,
    ...options,
  };

  const code = new CodeBuilder(opts.indent);

  if (!opts.noTags) {
    code.push(opts.shortTags ? '<?' : '<?php');
  }

  code.push("require_once('vendor/autoload.php');").blank();

  const requestOptions = new CodeBuilder(opts.indent);

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      requestOptions.push(
        1,
        "'form_params' => %s,",
        helpers.convert(source.postData.paramsObj, opts.indent + opts.indent, opts.indent)
      );
      break;

    case 'multipart/form-data': {
      if (source.postData.params) {
        const fields = [];

        source.postData.params.forEach(function (param) {
          if (param.fileName) {
            const field = {
              name: param.name,
              filename: param.fileName,
              contents: param.value,
            };

            if (param.contentType) {
              field.headers = { 'Content-Type': param.contentType };
            }

            fields.push(field);
          } else if (param.value) {
            fields.push({
              name: param.name,
              contents: param.value,
            });
          }
        });

        if (fields.length) {
          requestOptions.push(1, "'multipart' => %s", helpers.convert(fields, opts.indent + opts.indent, opts.indent));
        }

        // Guzzle adds its own boundary for multipart requests.
        if (headerHelpers.hasHeader(source.headersObj, 'content-type')) {
          if (headerHelpers.getHeader(source.headersObj, 'content-type').includes('boundary')) {
            // eslint-disable-next-line no-param-reassign
            delete source.headersObj[headerHelpers.getHeaderName(source.headersObj, 'content-type')];
          }
        }
      }
      break;
    }

    default:
      if (source.postData.text) {
        requestOptions.push(1, "'body' => %s,", helpers.convert(source.postData.text));
      }
  }

  // construct headers
  const headers = Object.keys(source.headersObj)
    .sort()
    .map(function (key) {
      return opts.indent + opts.indent + format("'%s' => '%s',", key, source.headersObj[key]);
    });

  // construct cookies
  const cookies = source.cookies.map(function (cookie) {
    return `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`;
  });

  if (cookies.length) {
    headers.push(opts.indent + opts.indent + format("'cookie' => '%s',", cookies.join('; ')));
  }

  if (headers.length) {
    requestOptions.push(1, "'headers' => [").push(headers.join('\n')).push(1, '],');
  }

  code.push('$client = new \\GuzzleHttp\\Client();').blank();

  if (requestOptions.code.length) {
    code
      .push(`$response = $client->request('${source.method}', '${source.fullUrl}', [`)
      .push(requestOptions.join(','))
      .push(']);');
  } else {
    code.push(`$response = $client->request('${source.method}', '${source.fullUrl}');`);
  }

  code.blank().push('echo $response->getBody();');

  if (!opts.noTags && opts.closingTag) {
    code.blank().push('?>');
  }

  return code.join();
};

module.exports.info = {
  key: 'guzzle',
  title: 'Guzzle',
  link: 'http://docs.guzzlephp.org/en/stable/',
  description: 'PHP with guzzle',
};
