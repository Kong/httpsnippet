/**
 * @description
 * Asynchronous Http and WebSocket Client library for Java
 *
 * @author
 * @windard
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../..';
import { CodeBuilder } from '../../../helpers/code-builder';

interface AsyncHttpOptions {
  indent?: string;
}

export const asynchttp: Client<AsyncHttpOptions> = {
  info: {
    key: 'asynchttp',
    title: 'AsyncHttp',
    link: 'https://github.com/AsyncHttpClient/async-http-client',
    description: 'Asynchronous Http and WebSocket Client library for Java',
  },
  convert: (source, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };
    const { blank, push, join } = new CodeBuilder(opts.indent);

    push('AsyncHttpClient client = new DefaultAsyncHttpClient();');

    push(`client.prepare("${source.method.toUpperCase()}", "${source.fullUrl}")`);

    // Add headers, including the cookies
    Object.keys(source.allHeaders).forEach(key => {
      push(`.setHeader("${key}", "${source.allHeaders[key]}")`, 1);
    });

    if (source.postData.text) {
      push(`.setBody(${JSON.stringify(source.postData.text)})`, 1);
    }

    push('.execute()', 1);
    push('.toCompletableFuture()', 1);
    push('.thenAccept(System.out::println)', 1);
    push('.join();', 1);
    blank();
    push('client.close();');

    return join();
  },
};
