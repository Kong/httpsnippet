/**
 * @description
 * HTTP code snippet generator for Javascript & Node.js using Axios.
 *
 * @author
 * @rohit-gohri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import type { Client } from '../../index.js';

import stringifyObject from 'stringify-object';

import { CodeBuilder } from '../../../helpers/code-builder.js';

export const axios: Client = {
  info: {
    key: 'axios',
    title: 'Axios',
    link: 'https://github.com/axios/axios',
    description: 'Promise based HTTP client for the browser and node.js',
    extname: '.js',
    installation: 'npm install axios --save',
  },
  convert: ({ allHeaders, method, url, queryObj, postData }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { blank, push, join, addPostProcessor } = new CodeBuilder({ indent: opts.indent });

    push("import axios from 'axios';");
    blank();

    const requestOptions: Record<string, any> = {
      method,
      url,
    };

    if (Object.keys(queryObj).length) {
      requestOptions.params = queryObj;
    }

    if (Object.keys(allHeaders).length) {
      requestOptions.headers = allHeaders;
    }

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        if (postData.params) {
          push('const encodedParams = new URLSearchParams();');
          postData.params.forEach(param => {
            push(`encodedParams.set('${param.name}', '${param.value}');`);
          });

          blank();

          requestOptions.data = 'encodedParams,';
          addPostProcessor(code => code.replace(/'encodedParams,'/, 'encodedParams,'));
        }

        break;

      case 'application/json':
        if (postData.jsonObj) {
          requestOptions.data = postData.jsonObj;
        }
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

        requestOptions.data = '[form]';
        break;

      default:
        if (postData.text) {
          requestOptions.data = postData.text;
        }
    }

    const optionString = stringifyObject(requestOptions, {
      indent: '  ',
      inlineCharacterLimit: 80,
    }).replace('"[form]"', 'form');
    push(`const options = ${optionString};`);
    blank();

    push('axios');
    push('.request(options)', 1);
    push('.then(function (response) {', 1);
    push('console.log(response.data);', 2);
    push('})', 1);
    push('.catch(function (error) {', 1);
    push('console.error(error);', 2);
    push('});', 1);

    return join();
  },
};
