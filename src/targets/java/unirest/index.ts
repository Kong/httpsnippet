/**
 * @description
 * HTTP code snippet generator for Java using Unirest.
 *
 * @author
 * @shashiranjan84
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../..';
import { CodeBuilder } from '../../../helpers/code-builder';

export const unirest: Client = {
  info: {
    key: 'unirest',
    title: 'Unirest',
    link: 'http://unirest.io/java.html',
    description: 'Lightweight HTTP Request Client Library',
  },
  convert: ({ method, allHeaders, postData, fullUrl }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { join, push } = new CodeBuilder({ indent: opts.indent });

    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

    if (methods.indexOf(method.toUpperCase()) === -1) {
      push(`HttpResponse<String> response = Unirest.customMethod("${method.toUpperCase()}","${fullUrl}")`);
    } else {
      push(`HttpResponse<String> response = Unirest.${method.toLowerCase()}("${fullUrl}")`);
    }

    // Add headers, including the cookies
    Object.keys(allHeaders).forEach(key => {
      push(`.header("${key}", "${allHeaders[key]}")`, 1);
    });

    if (postData.text) {
      push(`.body(${JSON.stringify(postData.text)})`, 1);
    }

    push('.asString();', 1);

    return join();
  },
};