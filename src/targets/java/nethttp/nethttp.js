/**
 * @description
 * HTTP code snippet generator for Java using java.net.http.
 *
 * @author
 * @wtetsu
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

  code.push('HttpRequest request = HttpRequest.newBuilder()');
  code.push(`.uri(URI.create("${source.fullUrl}"))`, 2);

  const headers = Object.keys(source.allHeaders);

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(`.header("${key}", "${source.allHeaders[key]}")`, 2);
    });
  }

  if (source.postData.text) {
    code.push(`.method("${source.method.toUpperCase()}", HttpRequest.BodyPublishers.ofString(${JSON.stringify(source.postData.text)}))`, 2);
  } else {
    code.push(`.method("${source.method.toUpperCase()}", HttpRequest.BodyPublishers.noBody())`, 2);
  }

  code.push('.build();', 2);

  code.push('HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());');
  code.push('System.out.println(response.body());');

  return code.join();
};

module.exports.info = {
  key: 'nethttp',
  title: 'java.net.http',
  link: 'https://openjdk.java.net/groups/net/httpclient/intro.html',
  description: 'Java Standardized HTTP Client API',
};
