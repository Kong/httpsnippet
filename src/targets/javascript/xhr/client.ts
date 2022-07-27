/**
 * @description
 * HTTP code snippet generator for native XMLHttpRequest
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import stringifyObject from 'stringify-object';

import { CodeBuilder } from '../../../helpers/code-builder';
import { escapeForSingleQuotes } from '../../../helpers/escape';
import { getHeader, getHeaderName, hasHeader } from '../../../helpers/headers';
import { Client } from '../../targets';

export interface XhrOptions {
  cors?: boolean;
}

export const xhr: Client = {
  info: {
    key: 'xhr',
    title: 'XMLHttpRequest',
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest',
    description: 'W3C Standard API that provides scripted client functionality',
  },
  convert: ({ postData, allHeaders, method, fullUrl }, options) => {
    const opts = {
      indent: '  ',
      cors: true,
      ...options,
    };

    const { blank, push, join } = new CodeBuilder({ indent: opts.indent });

    switch (postData.mimeType) {
      case 'application/json':
        push(
          `const data = JSON.stringify(${stringifyObject(postData.jsonObj, {
            indent: opts.indent,
          })});`,
        );
        blank();
        break;

      case 'multipart/form-data':
        if (!postData.params) {
          break;
        }

        push('const data = new FormData();');

        postData.params.forEach(param => {
          push(`data.append('${param.name}', '${param.value || param.fileName || ''}');`);
        });

        // remove the contentType header
        if (hasHeader(allHeaders, 'content-type')) {
          if (getHeader(allHeaders, 'content-type')?.includes('boundary')) {
            const headerName = getHeaderName(allHeaders, 'content-type');
            if (headerName) {
              delete allHeaders[headerName];
            }
          }
        }

        blank();
        break;

      default:
        push(`const data = ${postData.text ? `'${postData.text}'` : 'null'};`);
        blank();
    }

    push('const xhr = new XMLHttpRequest();');

    if (opts.cors) {
      push('xhr.withCredentials = true;');
    }

    blank();
    push("xhr.addEventListener('readystatechange', function () {");
    push('if (this.readyState === this.DONE) {', 1);
    push('console.log(this.responseText);', 2);
    push('}', 1);
    push('});');
    blank();
    push(`xhr.open('${method}', '${fullUrl}');`);

    Object.keys(allHeaders).forEach(key => {
      push(`xhr.setRequestHeader('${key}', '${escapeForSingleQuotes(allHeaders[key])}');`);
    });

    blank();
    push('xhr.send(data);');

    return join();
  },
};
