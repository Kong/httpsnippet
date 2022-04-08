/**
 * @description
 * HTTP code snippet generator for Python using Requests
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const util = require('util');
const CodeBuilder = require('../../helpers/code-builder');
const helpers = require('./helpers');

module.exports = function (source, options) {
  const opts = Object.assign(
    {
      indent: '    ',
      pretty: true,
    },
    options,
  );

  // Start snippet
  const code = new CodeBuilder(opts.indent);

  // Import requests
  code.push('import requests').blank();

  // Set URL
  code.push(`url = "${source.url}"`).blank();

  // Construct query string
  let qs;
  if (Object.keys(source.queryObj).length) {
    qs = 'querystring = ' + JSON.stringify(source.queryObj);

    code.push(qs).blank();
  }

  // Construct payload
  let hasPayload = false;
  let jsonPayload = false;
  switch (source.postData.mimeType) {
    case 'application/json':
      if (source.postData.jsonObj) {
        code.push(`payload = ${helpers.literalRepresentation(source.postData.jsonObj, opts)}`);
        jsonPayload = true;
        hasPayload = true;
      }
      break;

    default: {
      const payload = JSON.stringify(source.postData.text);
      if (payload) {
        code.push(`payload = ${payload}`);
        hasPayload = true;
      }
    }
  }

  // Construct headers
  const headers = source.allHeaders;
  const headerCount = Object.keys(headers).length;

  if (headerCount === 1) {
    for (const header in headers) {
      code.push(`headers = {"${header}": "${headers[header]}"}`).blank();
    }
  } else if (headerCount > 1) {
    let count = 1;

    code.push('headers = {');

    for (const header in headers) {
      if (count++ !== headerCount) {
        code.push(`"${header}": "${headers[header]}",`, 1);
      } else {
        code.push(`"${header}": "${headers[header]}"`, 1);
      }
    }

    code.push('}').blank();
  }

  // Construct request
  const method = source.method;
  let request = `response = requests.request("${method}", url`;

  if (hasPayload) {
    if (jsonPayload) {
      request += ', json=payload';
    } else {
      request += ', data=payload';
    }
  }

  if (headerCount > 0) {
    request += ', headers=headers';
  }

  if (qs) {
    request += ', params=querystring';
  }

  request += ')';

  code
    .push(request)
    .blank()

    // Print response
    .push('print(response.text)');

  return code.join();
};

module.exports.info = {
  key: 'requests',
  title: 'Requests',
  link: 'http://docs.python-requests.org/en/latest/api/#requests.request',
  description: 'Requests HTTP library',
};
