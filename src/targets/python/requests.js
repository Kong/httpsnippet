/**
 * @description
 * HTTP code snippet generator for Python using Requests
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

const { format } = require('util');
const CodeBuilder = require('../../helpers/code-builder');
const helpers = require('./helpers');
const headerHelpers = require('../../helpers/headers');

module.exports = function (source, options) {
  const opts = {
    indent: '    ',
    pretty: true,
    ...options,
  };

  // Start snippet
  const code = new CodeBuilder(opts.indent);

  // Import requests
  code.push('import requests').blank();

  // Set URL
  code.push('url = "%s"', source.fullUrl).blank();

  const headers = source.allHeaders;

  // Construct payload
  let payload;
  let hasFiles = false;
  let hasPayload = false;
  let jsonPayload = false;
  switch (source.postData.mimeType) {
    case 'application/json':
      if (source.postData.jsonObj) {
        code.push('payload = %s', helpers.literalRepresentation(source.postData.jsonObj, opts));
        jsonPayload = true;
        hasPayload = true;
      }
      break;

    case 'multipart/form-data':
      if (source.postData.params) {
        const files = {};
        payload = {};

        source.postData.params.forEach(p => {
          if (p.fileName) {
            files[p.name] = `open('${p.fileName}', 'rb')`;
            hasFiles = true;
          } else {
            payload[p.name] = p.value;
            hasPayload = true;
          }
        });

        if (hasFiles) {
          code.push('files = %s', helpers.literalRepresentation(files, opts));

          if (hasPayload) {
            code.push('payload = %s', helpers.literalRepresentation(payload, opts));
          }

          // The requests library will only automatically add a `multipart/form-data` header if
          // there are files being sent. If we're **only** sending form data we still need to send
          // the boundary ourselves.
          delete headers[headerHelpers.getHeaderName(headers, 'content-type')];
        } else {
          payload = JSON.stringify(source.postData.text);
          if (payload) {
            code.push('payload = %s', payload);
            hasPayload = true;
          }
        }
      }
      break;

    default:
      payload = JSON.stringify(source.postData.text);
      if (payload) {
        code.push('payload = %s', payload);
        hasPayload = true;
      }
  }

  // Construct headers
  const headerCount = Object.keys(headers).length;

  if (!headerCount && (hasPayload || hasFiles)) {
    // If we don't have any heads but we do have a payload we should put a blank line here between
    // that payload consturction and our execution of the requests library.
    code.blank();
  } else if (headerCount === 1) {
    Object.keys(headers).forEach(header => {
      code.push('headers = {"%s": "%s"}', header, headers[header]).blank();
    });
  } else if (headerCount > 1) {
    let count = 1;

    code.push('headers = {');

    Object.keys(headers).forEach(header => {
      // eslint-disable-next-line no-plusplus
      if (count++ !== headerCount) {
        code.push(1, '"%s": "%s",', header, headers[header]);
      } else {
        code.push(1, '"%s": "%s"', header, headers[header]);
      }
    });

    code.push('}').blank();
  }

  // Construct request
  const method = source.method;
  let request;
  // Method list pulled from their api reference https://docs.python-requests.org/en/latest/api/#requests.head
  if (['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    request = format('response = requests.%s(url', method.toLowerCase());
  } else {
    request = format('response = requests.request("%s", url', method);
  }

  if (hasPayload) {
    if (jsonPayload) {
      request += ', json=payload';
    } else {
      request += ', data=payload';
    }
  }

  if (hasFiles) {
    request += ', files=files';
  }

  if (headerCount > 0) {
    request += ', headers=headers';
  }

  request += ')';

  code.push(request).blank().push('print(response.text)');

  return (
    code
      .join()
      // The `open()` call must be a literal in the code snippet.
      .replace(/"open\('(.+)', 'rb'\)"/g, 'open("$1", "rb")')
  );
};

module.exports.info = {
  key: 'requests',
  title: 'Requests',
  link: 'http://docs.python-requests.org/en/latest/api/#requests.request',
  description: 'Requests HTTP library',
};
