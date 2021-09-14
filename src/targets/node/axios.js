/**
 * @description
 * HTTP code snippet generator for Javascript & Node.js using Axios.
 *
 * @author
 * @rohit-gohri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const stringifyObject = require('stringify-object');
const CodeBuilder = require('../../helpers/code-builder');

module.exports = function (source, options) {
  const opts = {
    indent: '  ',
    ...options,
  };

  const code = new CodeBuilder(opts.indent);

  code.push('const axios = require("axios").default;');

  const reqOpts = {
    method: source.method,
    url: source.fullUrl,
  };

  if (Object.keys(source.allHeaders).length) {
    reqOpts.headers = source.allHeaders;
  }

  switch (source.postData.mimeType) {
    case 'application/x-www-form-urlencoded':
      code.push("const { URLSearchParams } = require('url');");
      code.push('const encodedParams = new URLSearchParams();');
      code.blank();

      source.postData.params.forEach(function (param) {
        code.push(`encodedParams.set('${param.name}', '${param.value}');`);
      });

      reqOpts.data = 'encodedParams';
      break;

    case 'application/json':
      if (source.postData.jsonObj) {
        reqOpts.data = source.postData.jsonObj;
      }
      break;

    default:
      if (source.postData.text) {
        reqOpts.data = source.postData.text;
      }
  }

  code.blank();
  code.push('const options = %s;', stringifyObject(reqOpts, { indent: '  ', inlineCharacterLimit: 80 })).blank();

  code
    .push('axios.request(options).then(function (response) {')
    .push(1, 'console.log(response.data);')
    .push('}).catch(%s', 'function (error) {')
    .push(1, 'console.error(error);')
    .push('});');

  return code.join().replace(/'encodedParams'/, 'encodedParams');
};

module.exports.info = {
  key: 'axios',
  title: 'Axios',
  link: 'https://github.com/axios/axios',
  description: 'Promise based HTTP client for the browser and node.js',
};
