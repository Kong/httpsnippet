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

export interface JQueryOptions {
  indent?: string;
}

export const jquery: Client<JQueryOptions> = {
  info: {
    key: 'jquery',
    title: 'jQuery',
    link: 'http://api.jquery.com/jquery.ajax/',
    description: 'Perform an asynchronous HTTP (Ajax) requests with jQuery',
  },
  convert: (source, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { blank, push, join } = new CodeBuilder(opts.indent);

    const settings: Record<string, any> = {
      async: true,
      crossDomain: true,
      url: source.fullUrl,
      method: source.method,
      headers: source.allHeaders,
    };

    switch (source.postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        settings.data = source.postData.paramsObj ? source.postData.paramsObj : source.postData.text;
        break;

      case 'application/json':
        settings.processData = false;
        settings.data = source.postData.text;
        break;

      case 'multipart/form-data':
        push('const form = new FormData();');

        source.postData.params.forEach(param => {
          push(`form.append('${param.name}', '${param.value || param.fileName || ''}');`);
        });

        settings.processData = false;
        settings.contentType = false;
        settings.mimeType = 'multipart/form-data';
        settings.data = '[form]';

        // remove the contentType header
        if (hasHeader(source.allHeaders, 'content-type')) {
          if (getHeader(source.allHeaders, 'content-type')?.includes('boundary')) {
            delete settings.headers[getHeaderName(source.allHeaders, 'content-type')!];
          }
        }

        blank();
        break;

      default:
        if (source.postData.text) {
          settings.data = source.postData.text;
        }
    }

    const stringifiedSettings = stringifyObject(settings, { indent: opts.indent }).replace(`'[form]'`, 'form');

    push(`const settings = ${stringifiedSettings};`);
    blank();
    push('$.ajax(settings).done(function (response) {');
    push('console.log(response);', 1);
    push('});');

    return join();
  },
};
