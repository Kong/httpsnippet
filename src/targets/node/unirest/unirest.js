/**
 * @description
 * HTTP code snippet generator for Node.js using Unirest.
 *
 * @author
 * @AhmadNassri
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

  let includeFS = false;
  const code = new CodeBuilder(opts.indent);

  code.push('const unirest = require("unirest");').blank().push(`const req = unirest("${source.method}", "${source.url}");`).blank();

  if (source.cookies.length) {
    code.push('const CookieJar = unirest.jar();');

    source.cookies.forEach(function (cookie) {
      code.push(`CookieJar.add("${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}","${source.url}");`);
    });

    code.push('req.jar(CookieJar);').blank();
  }

  if (Object.keys(source.queryObj).length) {
    code.push(`req.query(${JSON.stringify(source.queryObj, null, opts.indent)});`).blank();
  }

  if (Object.keys(source.headersObj).length) {
    code.push(`req.headers(${JSON.stringify(source.headersObj, null, opts.indent)});`).blank();
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      if (source.postData.paramsObj) {
        code.push(`req.form(${JSON.stringify(source.postData.paramsObj, null, opts.indent)});`).blank();
      }
      break;

    case 'application/json':
      if (source.postData.jsonObj) {
        code
          .push('req.type("json");')
          .push(`req.send(${JSON.stringify(source.postData.jsonObj, null, opts.indent)});`)
          .blank();
      }
      break;

    case 'multipart/form-data': {
      const multipart = [];

      source.postData.params.forEach(function (param) {
        const part = {};

        if (param.fileName && !param.value) {
          includeFS = true;

          part.body = 'fs.createReadStream("' + param.fileName + '")';
        } else if (param.value) {
          part.body = param.value;
        }

        if (part.body) {
          if (param.contentType) {
            part['content-type'] = param.contentType;
          }

          multipart.push(part);
        }
      });

      code.push(`req.multipart(${JSON.stringify(multipart, null, opts.indent)});`).blank();
      break;
    }

    default:
      if (source.postData.text) {
        code.push(`req.send(${JSON.stringify(source.postData.text, null, opts.indent)});`).blank();
      }
  }

  if (includeFS) {
    code.unshift('const fs = require("fs");');
  }

  code
    .push('req.end(function (res) {')
    .push('if (res.error) throw new Error(res.error);', 1)
    .blank()
    .push('console.log(res.body);', 1)
    .push('});')
    .blank();

  return code.join().replace(/"fs\.createReadStream\(\\"(.+)\\"\)"/, 'fs.createReadStream("$1")');
};

module.exports.info = {
  key: 'unirest',
  title: 'Unirest',
  link: 'http://unirest.io/nodejs.html',
  description: 'Lightweight HTTP Request Client Library',
};