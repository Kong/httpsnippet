/**
 * @description
 * HTTP code snippet generator for native Crystal
 *
 * @author
 * @18183883296
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import { CodeBuilder } from '../../../helpers/code-builder';
import { escapeForDoubleQuotes } from '../../../helpers/escape';
import { Client } from '../../targets';

export interface CrystalNativeOptions {
  insecureSkipVerify?: boolean;
}

export const native: Client<CrystalNativeOptions> = {
  info: {
    key: 'native',
    title: 'http::client',
    link: 'https://crystal-lang.org/api/master/HTTP/Client.html',
    description: 'Crystal HTTP client',
  },
  convert: ({ method: rawMethod, fullUrl, postData, allHeaders }, options = {}) => {
    const { insecureSkipVerify = false } = options;

    const { push, blank, join } = new CodeBuilder();

    push('require "http/client"');

    blank();

    push(`url = "${fullUrl}"`);

    const headers = Object.keys(allHeaders);
    if (headers.length) {
      push('headers = HTTP::Headers{');
      headers.forEach(key => {
        push(`  "${key}" => "${escapeForDoubleQuotes(allHeaders[key])}"`);
      });
      push('}');
    }

    if (postData.text) {
      push(`reqBody = ${JSON.stringify(postData.text)}`);
    }

    blank();

    const method = rawMethod.toUpperCase();
    const methods = ['GET', 'POST', 'HEAD', 'DELETE', 'PATCH', 'PUT', 'OPTIONS'];

    const headersContext = headers.length ? ', headers: headers' : '';
    const bodyContext = postData.text ? ', body: reqBody' : '';
    const sslContext = insecureSkipVerify ? ', tls: OpenSSL::SSL::Context::Client.insecure' : '';

    if (methods.includes(method)) {
      push(
        `response = HTTP::Client.${method.toLowerCase()} url${headersContext}${bodyContext}${sslContext}`,
      );
    } else {
      push(
        `response = HTTP::Client.exec "${method}", url${headersContext}${bodyContext}${sslContext}`,
      );
    }

    push('puts response.body');

    return join();
  },
};
