/**
 * @description
 * HTTP code snippet generator for Kotlin using OkHttp.
 *
 * @author
 * @seanghay
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../..';
import { CodeBuilder } from '../../../helpers/code-builder';

export interface OkhttpOptions {
  indent?: string;
}

export const okhttp: Client<OkhttpOptions> = {
  info: {
    key: 'okhttp',
    title: 'OkHttp',
    link: 'http://square.github.io/okhttp/',
    description: 'An HTTP Request Client Library',
  },
  convert: (source, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };
    const { blank, join, push } = new CodeBuilder(opts.indent);

    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'];

    const methodsWithBody = ['POST', 'PUT', 'DELETE', 'PATCH'];

    push('val client = OkHttpClient()');
    blank();

    if (source.postData.text) {
      if (source.postData.boundary) {
        push(`val mediaType = MediaType.parse("${source.postData.mimeType}; boundary=${source.postData.boundary}")`);
      } else {
        push(`val mediaType = MediaType.parse("${source.postData.mimeType}")`);
      }
      push(`val body = RequestBody.create(mediaType, ${JSON.stringify(source.postData.text)})`);
    }

    push('val request = Request.Builder()');
    push(`.url("${source.fullUrl}")`, 1);
    if (methods.indexOf(source.method.toUpperCase()) === -1) {
      if (source.postData.text) {
        push(`.method("${source.method.toUpperCase()}", body)`, 1);
      } else {
        push(`.method("${source.method.toUpperCase()}", null)`, 1);
      }
    } else if (methodsWithBody.indexOf(source.method.toUpperCase()) >= 0) {
      if (source.postData.text) {
        push(`.${source.method.toLowerCase()}(body)`, 1);
      } else {
        push(`.${source.method.toLowerCase()}(null)`, 1);
      }
    } else {
      push(`.${source.method.toLowerCase()}()`, 1);
    }

    // Add headers, including the cookies
    Object.keys(source.allHeaders).forEach(key => {
      push(`.addHeader("${key}", "${source.allHeaders[key]}")`, 1);
    });

    push('.build()', 1);
    blank();
    push('val response = client.newCall(request).execute()');

    return join();
  },
};
