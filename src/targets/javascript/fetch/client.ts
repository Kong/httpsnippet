/**
 * @description
 * HTTP code snippet generator for fetch
 *
 * @author
 * @pmdroid
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import stringifyObject from 'stringify-object';

import { CodeBuilder } from '../../../helpers/code-builder';
import { Client } from '../../targets';

interface FetchOptions {
  credentials?: Record<string, string> | null;
}

export const fetch: Client<FetchOptions> = {
  info: {
    key: 'fetch',
    title: 'fetch',
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
    description: 'Perform asynchronous HTTP requests with the Fetch API',
  },
  convert: ({ method, allHeaders, postData, fullUrl }, inputOpts) => {
    const opts = {
      indent: '  ',
      credentials: null,
      ...inputOpts,
    };

    const { blank, join, push } = new CodeBuilder({ indent: opts.indent });

    const options: Record<string, any> = {
      method,
    };

    if (Object.keys(allHeaders).length) {
      options.headers = allHeaders;
    }

    if (opts.credentials !== null) {
      options.credentials = opts.credentials;
    }

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        options.body = postData.paramsObj ? postData.paramsObj : postData.text;
        break;

      case 'application/json':
        options.body = JSON.stringify(postData.jsonObj);
        break;

      case 'multipart/form-data':
        if (!postData.params) {
          break;
        }

        push('const form = new FormData();');

        postData.params.forEach(param => {
          push(`form.append('${param.name}', '${param.value || param.fileName || ''}');`);
        });

        blank();
        break;

      default:
        if (postData.text) {
          options.body = postData.text;
        }
    }

    push(
      `const options = ${stringifyObject(options, {
        indent: opts.indent,
        inlineCharacterLimit: 80,
        transform: (_, property, originalResult) => {
          if (property === 'body' && postData.mimeType === 'application/x-www-form-urlencoded') {
            return `new URLSearchParams(${originalResult})`;
          }
          return originalResult;
        },
      })};`,
    );
    blank();

    if (postData.params && postData.mimeType === 'multipart/form-data') {
      push('options.body = form;');
      blank();
    }

    push(`fetch('${fullUrl}', options)`);
    push('.then(response => response.json())', 1);
    push('.then(response => console.log(response))', 1);
    push('.catch(err => console.error(err));', 1);

    return join();
  },
};
