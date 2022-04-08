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
  code.push(`.url("${source.fullUrl}")`, 1);
  if (methods.indexOf(source.method.toUpperCase()) === -1) {
    if (source.postData.text) {
      code.push(`.method("${source.method.toUpperCase()}", body)`, 1);
    } else {
      code.push(`.method("${source.method.toUpperCase()}", null)`, 1);
    }
  } else if (methodsWithBody.indexOf(source.method.toUpperCase()) >= 0) {
    if (source.postData.text) {
      code.push(`.${source.method.toLowerCase()}(body)`, 1);
    } else {
      code.push(`.${source.method.toLowerCase()}(null)`, 1);
    }
  } else {
    code.push(`.${source.method.toLowerCase()}()`, 1);
  }

  // Add headers, including the cookies
  const headers = Object.keys(source.allHeaders);

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(`.addHeader("${key}", "${source.allHeaders[key]}")`, 1);
    });
  }

  code.push('.build()').blank().push('val response = client.newCall(request).execute()', 1);

  return code.join();
};

module.exports.info = {
  key: 'okhttp',
  title: 'OkHttp',
  link: 'http://square.github.io/okhttp/',
  description: 'An HTTP Request Client Library',
};
