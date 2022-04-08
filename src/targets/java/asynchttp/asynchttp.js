/**
 * @description
 * Asynchronous Http and WebSocket Client library for Java
 *
 * @author
 * @windard
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

  code.push('AsyncHttpClient client = new DefaultAsyncHttpClient();');

  code.push(`client.prepare("${source.method.toUpperCase()}", "${source.fullUrl}")`);

  // Add headers, including the cookies
  const headers = Object.keys(source.allHeaders);

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(`.setHeader("${key}", "${source.allHeaders[key]}")`, 1);
    });
  }

  if (source.postData.text) {
    code.push(`.setBody(${JSON.stringify(source.postData.text)})`, 1);
  }

  code.push('.execute()', 1);
  code.push('.toCompletableFuture()', 1);
  code.push('.thenAccept(System.out::println)', 1);
  code.push('.join();', 1);
  code.blank();
  code.push('client.close();');

  return code.join();
};

module.exports.info = {
  key: 'asynchttp',
  title: 'AsyncHttp',
  link: 'https://github.com/AsyncHttpClient/async-http-client',
  description: 'Asynchronous Http and WebSocket Client library for Java',
};
