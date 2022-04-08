/**
 * @description
 * HTTP code snippet generator for fetch
 *
 * @author
 * @pmdroid
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../..';
import { CodeBuilder } from '../../../helpers/code-builder';
import stringifyObject from 'stringify-object';

interface FetchOptions {
  indent?: string;
  credentials?: null | Record<string, string>;
}

export const fetch: Client<FetchOptions> = {
  info: {
    key: 'fetch',
    title: 'fetch',
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
    description: 'Perform asynchronous HTTP requests with the Fetch API',
  },
  convert: (source, inputOpts) => {
    const opts = {
      indent: '  ',
      credentials: null,
      ...inputOpts,
    };

    const { blank, join, push } = new CodeBuilder(opts.indent);

    const options: Record<string, any> = {
      method: source.method,
    };

    if (Object.keys(source.allHeaders).length) {
      options.headers = source.allHeaders;
    }

    if (opts.credentials !== null) {
      options.credentials = opts.credentials;
    }

    switch (source.postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        options.body = source.postData.paramsObj ? source.postData.paramsObj : source.postData.text;
        break;

      case 'application/json':
        options.body = JSON.stringify(source.postData.jsonObj);
        break;

      case 'multipart/form-data':
        push('const form = new FormData();');

        source.postData.params.forEach(param => {
          push(`form.append('${param.name}', '${param.value || param.fileName || ''}');`);
        });

        blank();
        break;

      default:
        if (source.postData.text) {
          options.body = source.postData.text;
        }
    }

    push(
      `const options = ${stringifyObject(options, {
        indent: opts.indent,
        inlineCharacterLimit: 80,
        transform: (_, property, originalResult) => {
          if (property === 'body' && source.postData.mimeType === 'application/x-www-form-urlencoded') {
            return `new URLSearchParams(${originalResult})`;
          }
          return originalResult;
        },
      })};`,
    );
    blank();

    if (source.postData.mimeType === 'multipart/form-data') {
      push('options.body = form;');
      blank();
    }

    push(`fetch('${source.fullUrl}', options)`);
    push('.then(response => response.json())', 1);
    push('.then(response => console.log(response))', 1);
    push('.catch(err => console.error(err));', 1);

    return join();
  },
};
