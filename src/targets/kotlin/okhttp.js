/**
 * @description
 * HTTP code snippet generator for Kotlin using OkHttp.
 *
 * @author
 * @seanghay
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

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];

  const methodsWithBody = ['POST', 'PUT', 'DELETE', 'PATCH'];

  code.push('val client = OkHttpClient()').blank();

  if (source.postData.text) {
    if (source.postData.boundary) {
      code.push(`val mediaType = MediaType.parse("${source.postData.mimeType}; boundary=${source.postData.boundary}")`);
    } else {
      code.push(`val mediaType = MediaType.parse("${source.postData.mimeType}")`);
    }
    code.push(`val body = RequestBody.create(mediaType, ${JSON.stringify(source.postData.text)})`);
  }

  code.push('val request = Request.Builder()');
  code.push(1, `.url("${source.fullUrl}")`);
  if (methods.indexOf(source.method.toUpperCase()) === -1) {
    if (source.postData.text) {
      code.push(1, `.method("${source.method.toUpperCase()}", body)`);
    } else {
      code.push(1, `.method("${source.method.toUpperCase()}", null)`);
    }
  } else if (methodsWithBody.indexOf(source.method.toUpperCase()) >= 0) {
    if (source.postData.text) {
      code.push(1, `.${source.method.toLowerCase()}(body)`);
    } else {
      code.push(1, `.${source.method.toLowerCase()}(null)`);
    }
  } else {
    code.push(1, `.${source.method.toLowerCase()}()`);
  }

  // Add headers, including the cookies
  const headers = Object.keys(source.allHeaders);

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(1, `.addHeader("${key}", "${source.allHeaders[key]}")`);
    });
  }

  code.push(1, '.build()').blank().push('val response = client.newCall(request).execute()');

  return code.join();
};

module.exports.info = {
  key: 'okhttp',
  title: 'OkHttp',
  link: 'http://square.github.io/okhttp/',
  description: 'An HTTP Request Client Library',
};
