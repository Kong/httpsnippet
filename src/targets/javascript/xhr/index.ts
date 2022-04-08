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
import { Client } from '../..';
import { CodeBuilder } from '../../../helpers/code-builder';
import { getHeader, getHeaderName, hasHeader } from '../../../helpers/headers';

export interface XhrOptions {
  indent?: string;
  cors?: boolean;
}

export const xhr: Client<XhrOptions> = {
  info: {
    key: 'xhr',
    title: 'XMLHttpRequest',
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest',
    description: 'W3C Standard API that provides scripted client functionality',
  },
  convert: (source, options) => {
    const opts = {
      indent: '  ',
      cors: true,
      ...options,
    };

    const { blank, push, join } = new CodeBuilder(opts.indent);

    switch (source.postData.mimeType) {
      case 'application/json':
        push(`const data = JSON.stringify(${stringifyObject(source.postData.jsonObj, { indent: opts.indent })});`);
        blank();
        break;

      case 'multipart/form-data':
        push('const data = new FormData();');

        source.postData.params.forEach(param => {
          push(`data.append('${param.name}', '${param.value || param.fileName || ''}');`);
        });

        // remove the contentType header
        if (hasHeader(source.allHeaders, 'content-type')) {
          if (getHeader(source.allHeaders, 'content-type')?.includes('boundary')) {
            delete source.allHeaders[getHeaderName(source.allHeaders, 'content-type')!];
          }
        }

        blank();
        break;

      default:
        push(`const data = ${source.postData.text ? `'${source.postData.text}'` : 'null'};`);
        blank();
    }

    push('const xhr = new XMLHttpRequest();');

    if (opts.cors) {
      push('xhr.withCredentials = true;');
    }

    blank();
    push(`xhr.addEventListener('readystatechange', function () {`);
    push('if (this.readyState === this.DONE) {', 1);
    push('console.log(this.responseText);', 2);
    push('}', 1);
    push('});');
    blank();
    push(`xhr.open('${source.method}', '${source.fullUrl}');`);

    Object.keys(source.allHeaders).forEach(key => {
      push(`xhr.setRequestHeader('${key}', '${source.allHeaders[key]}');`);
    });

    blank();
    push('xhr.send(data);');

    return join();
  },
};
