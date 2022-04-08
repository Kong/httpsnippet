/**
 * @description
 * HTTP code snippet generator for native Node.js.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const stringifyObject = require('stringify-object');
const CodeBuilder = require('../../helpers/code-builder');

module.exports = function (source, options) {
  const opts = Object.assign(
    {
      indent: '  ',
    },
    options,
  );

  const code = new CodeBuilder(opts.indent);

  const reqOpts = {
    method: source.method,
    hostname: source.uriObj.hostname,
    port: source.uriObj.port,
    path: source.uriObj.path,
    headers: source.allHeaders,
  };

  code.push(`const http = require("${source.uriObj.protocol.replace(':', '')}");`);

  code
    .blank()
    .push(`const options = ${JSON.stringify(reqOpts, null, opts.indent)};`)
    .blank()
    .push('const req = http.request(options, function (res) {')
    .push('const chunks = [];', 1)
    .blank()
    .push('res.on("data", function (chunk) {', 1)
    .push('chunks.push(chunk);', 2)
    .push('});', 1)
    .blank()
    .push('res.on("end", function () {', 1)
    .push('const body = Buffer.concat(chunks);', 2)
    .push('console.log(body.toString());', 2)
    .push('});', 1)
    .push('});')
    .blank();

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      if (source.postData.paramsObj) {
        code.unshift('const qs = require("querystring");');
        code.push(
          `req.write(qs.stringify(${stringifyObject(source.postData.paramsObj, {
            indent: '  ',
            inlineCharacterLimit: 80,
          })}));`,
        );
      }
      break;

    case 'application/json':
      if (source.postData.jsonObj) {
        code.push(
          `req.write(JSON.stringify(${stringifyObject(source.postData.jsonObj, {
            indent: '  ',
            inlineCharacterLimit: 80,
          })}));`,
        );
      }
      break;

    default:
      if (source.postData.text) {
        code.push(`req.write(${JSON.stringify(source.postData.text, null, opts.indent)});`);
      }
  }

  code.push('req.end();');

  return code.join();
};

module.exports.info = {
  key: 'native',
  title: 'HTTP',
  link: 'http://nodejs.org/api/http.html#http_http_request_options_callback',
  description: 'Node.js native HTTP interface',
};
