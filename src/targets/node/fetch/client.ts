import type { Client } from '../../index.js';

import stringifyObject from 'stringify-object';

import { CodeBuilder } from '../../../helpers/code-builder.js';
import { getHeaderName } from '../../../helpers/headers.js';

export const fetch: Client = {
  info: {
    key: 'fetch',
    title: 'fetch',
    link: 'https://nodejs.org/docs/latest/api/globals.html#fetch',
    description: 'Perform asynchronous HTTP requests with the Fetch API',
    extname: '.js',
  },
  convert: ({ method, fullUrl, postData, headersObj, cookies }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    let includeFS = false;
    const { blank, push, join, unshift } = new CodeBuilder({ indent: opts.indent });

    const url = fullUrl;
    const reqOpts: Record<string, any> = {
      method,
    };

    if (Object.keys(headersObj).length) {
      reqOpts.headers = headersObj;
    }

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        push('const encodedParams = new URLSearchParams();');

        postData.params?.forEach(param => {
          push(`encodedParams.set('${param.name}', '${param.value}');`);
        });

        reqOpts.body = 'encodedParams';
        blank();
        break;

      case 'application/json':
        if (postData.jsonObj) {
          // Though `fetch` doesn't accept JSON objects in the `body` option we're going to
          // stringify it when we add this into the snippet further down.
          reqOpts.body = postData.jsonObj;
        }
        break;

      case 'multipart/form-data':
        if (!postData.params) {
          break;
        }

        // The FormData API automatically adds a `Content-Type` header for `multipart/form-data` content and if we add our own here data won't be correctly transmitted.
        // eslint-disable-next-line no-case-declarations -- We're only using `contentTypeHeader` within this block.
        const contentTypeHeader = getHeaderName(headersObj, 'content-type');
        if (contentTypeHeader) {
          delete headersObj[contentTypeHeader];
        }

        push('const formData = new FormData();');

        postData.params.forEach(param => {
          if (!param.fileName && !param.fileName && !param.contentType) {
            push(`formData.append('${param.name}', '${param.value}');`);
            return;
          }

          if (param.fileName) {
            includeFS = true;

            // Whenever we drop support for Node 18 we can change this blob work to use
            // `fs.openAsBlob('filename')`.
            push(
              `formData.append('${param.name}', await new Response(fs.createReadStream('${param.fileName}')).blob());`,
            );
          }
        });

        reqOpts.body = 'formData';
        blank();
        break;

      default:
        if (postData.text) {
          reqOpts.body = postData.text;
        }
    }

    // construct cookies argument
    if (cookies.length) {
      const cookiesString = cookies
        .map(({ name, value }) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
        .join('; ');
      if (reqOpts.headers) {
        reqOpts.headers.cookie = cookiesString;
      } else {
        reqOpts.headers = {};
        reqOpts.headers.cookie = cookiesString;
      }
    }

    push(`const url = '${url}';`);

    // If we ultimately don't have any headers to send then we shouldn't add an empty object into the request options.
    if (reqOpts.headers && !Object.keys(reqOpts.headers).length) {
      delete reqOpts.headers;
    }

    const stringifiedOptions = stringifyObject(reqOpts, {
      indent: '  ',
      inlineCharacterLimit: 80,

      // The Fetch API body only accepts string parameters, but stringified JSON can be difficult to
      // read, so we keep the object as a literal and use this transform function to wrap the literal
      // in a `JSON.stringify` call.
      transform: (object, property, originalResult) => {
        if (property === 'body' && postData.mimeType === 'application/json') {
          return `JSON.stringify(${originalResult})`;
        }

        return originalResult;
      },
    });
    push(`const options = ${stringifiedOptions};`);
    blank();

    if (includeFS) {
      unshift("import fs from 'fs';\n");
    }

    push('fetch(url, options)');
    push('.then(res => res.json())', 1);
    push('.then(json => console.log(json))', 1);
    push('.catch(err => console.error(err));', 1);

    return join()
      .replace(/'encodedParams'/, 'encodedParams')
      .replace(/'formData'/, 'formData');
  },
};
