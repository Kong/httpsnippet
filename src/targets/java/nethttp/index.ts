/**
 * @description
 * HTTP code snippet generator for Java using java.net.http.
 *
 * @author
 * @wtetsu
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../..';
import { CodeBuilder } from '../../../helpers/code-builder';

export interface NetHttpOptions {
  indent?: string;
}

export const nethttp: Client<NetHttpOptions> = {
  info: {
    key: 'nethttp',
    title: 'java.net.http',
    link: 'https://openjdk.java.net/groups/net/httpclient/intro.html',
    description: 'Java Standardized HTTP Client API',
  },
  convert: (source, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { push, join } = new CodeBuilder(opts.indent);

    push('HttpRequest request = HttpRequest.newBuilder()');
    push(`.uri(URI.create("${source.fullUrl}"))`, 2);

    Object.keys(source.allHeaders).forEach(key => {
      push(`.header("${key}", "${source.allHeaders[key]}")`, 2);
    });

    if (source.postData.text) {
      push(`.method("${source.method.toUpperCase()}", HttpRequest.BodyPublishers.ofString(${JSON.stringify(source.postData.text)}))`, 2);
    } else {
      push(`.method("${source.method.toUpperCase()}", HttpRequest.BodyPublishers.noBody())`, 2);
    }

    push('.build();', 2);

    push('HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());');
    push('System.out.println(response.body());');

    return join();
  },
};
