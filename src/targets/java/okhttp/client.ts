/**
 * @description
 * HTTP code snippet generator for Java using OkHttp.
 *
 * @author
 * @shashiranjan84
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../../targets';
import { CodeBuilder } from '../../../helpers/code-builder';

export const okhttp: Client = {
  info: {
    key: 'okhttp',
    title: 'OkHttp',
    link: 'http://square.github.io/okhttp/',
    description: 'An HTTP Request Client Library',
  },
  convert: ({ postData, method, fullUrl, allHeaders }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };
    const { push, blank, join } = new CodeBuilder({ indent: opts.indent });

    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];
    const methodsWithBody = ['POST', 'PUT', 'DELETE', 'PATCH'];

    push('OkHttpClient client = new OkHttpClient();');
    blank();

    if (postData.text) {
      if (postData.boundary) {
        push(`MediaType mediaType = MediaType.parse("${postData.mimeType}; boundary=${postData.boundary}");`);
      } else {
        push(`MediaType mediaType = MediaType.parse("${postData.mimeType}");`);
      }
      push(`RequestBody body = RequestBody.create(mediaType, ${JSON.stringify(postData.text)});`);
    }

    push('Request request = new Request.Builder()');
    push(`.url("${fullUrl}")`, 1);
    if (methods.indexOf(method.toUpperCase()) === -1) {
      if (postData.text) {
        push(`.method("${method.toUpperCase()}", body)`, 1);
      } else {
        push(`.method("${method.toUpperCase()}", null)`, 1);
      }
    } else if (methodsWithBody.indexOf(method.toUpperCase()) >= 0) {
      if (postData.text) {
        push(`.${method.toLowerCase()}(body)`, 1);
      } else {
        push(`.${method.toLowerCase()}(null)`, 1);
      }
    } else {
      push(`.${method.toLowerCase()}()`, 1);
    }

    // Add headers, including the cookies
    Object.keys(allHeaders).forEach(key => {
      push(`.addHeader("${key}", "${allHeaders[key]}")`, 1);
    });

    push('.build();', 1);
    blank();
    push('Response response = client.newCall(request).execute();');

    return join();
  },
};
