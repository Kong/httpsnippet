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

export interface UnirestOptions {
  indent?: string;
}

export const unirest: Client<UnirestOptions> = {
  info: {
    key: 'unirest',
    title: 'Unirest',
    link: 'http://unirest.io/java.html',
    description: 'Lightweight HTTP Request Client Library',
  },
  convert: (source, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { join, push } = new CodeBuilder(opts.indent);

    const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

    if (methods.indexOf(source.method.toUpperCase()) === -1) {
      push(`HttpResponse<String> response = Unirest.customMethod("${source.method.toUpperCase()}","${source.fullUrl}")`);
    } else {
      push(`HttpResponse<String> response = Unirest.${source.method.toLowerCase()}("${source.fullUrl}")`);
    }

    // Add headers, including the cookies
    Object.keys(source.allHeaders).forEach(key => {
      push(`.header("${key}", "${source.allHeaders[key]}")`, 1);
    });

    if (source.postData.text) {
      push(`.body(${JSON.stringify(source.postData.text)})`, 1);
    }

    push('.asString();', 1);

    return join();
  },
};
