/**
 * @description
 * HTTP code snippet generator for fetch
 *
 * @author
 * @pmdroid
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import type { Client } from '../../index.js';

import stringifyObject from 'stringify-object';

import { CodeBuilder } from '../../../helpers/code-builder.js';
import { getHeaderName } from '../../../helpers/headers.js';

interface FetchOptions {
  credentials?: Record<string, string> | null;
}

export const fetch: Client<FetchOptions> = {
  info: {
    key: 'fetch',
    title: 'fetch',
    link: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
    description: 'Perform asynchronous HTTP requests with the Fetch API',
    extname: '.js',
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
        if (postData.jsonObj) {
          // Though `fetch` doesn't accept JSON objects in the `body` option we're going to
          // stringify it when we add this into the snippet further down.
          options.body = postData.jsonObj;
        }
        break;

      case 'multipart/form-data':
        if (!postData.params) {
          break;
        }

        // The FormData API automatically adds a `Content-Type` header for `multipart/form-data` content and if we add our own here data won't be correctly transmitted.
        // eslint-disable-next-line no-case-declarations -- We're only using `contentTypeHeader` within this block.
        const contentTypeHeader = getHeaderName(allHeaders, 'content-type');
        if (contentTypeHeader) {
          delete allHeaders[contentTypeHeader];
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

    // If we ultimately don't have any headers to send then we shouldn't add an empty object into the request options.
    if (options.headers && !Object.keys(options.headers).length) {
      delete options.headers;
    }

    push(
      `const options = ${stringifyObject(options, {
        indent: opts.indent,
        inlineCharacterLimit: 80,

        // The Fetch API body only accepts string parameters, but stringified JSON can be difficult
        // to read, so we keep the object as a literal and use this transform function to wrap the
        // literal in a `JSON.stringify` call.
        transform: (object, property, originalResult) => {
          if (property === 'body') {
            if (postData.mimeType === 'application/x-www-form-urlencoded') {
              return `new URLSearchParams(${originalResult})`;
            } else if (postData.mimeType === 'application/json') {
              return `JSON.stringify(${originalResult})`;
            }
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
    push('.then(res => res.json())', 1);
    push('.then(res => console.log(res))', 1);
    push('.catch(err => console.error(err));', 1);

    return join();
  },
};
