/**
 * @description
 * HTTP code snippet generator for Javascript & Node.js using Axios.
 *
 * @author
 * @rohit-gohri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../..';
import { CodeBuilder } from '../../../helpers/code-builder';
import stringifyObject from 'stringify-object';

export const axios: Client = {
  info: {
    key: 'axios',
    title: 'Axios',
    link: 'https://github.com/axios/axios',
    description: 'Promise based HTTP client for the browser and node.js',
  },
  convert: ({ allHeaders, method, url, queryObj, postData }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { blank, push, join } = new CodeBuilder({ indent: opts.indent });

    push(`import axios from 'axios';`);
    blank();

    const requestOptions: Record<string, any> = {
      method: method,
      url: url,
    };

    if (Object.keys(queryObj).length) {
      requestOptions.params = queryObj;
    }

    if (Object.keys(allHeaders).length) {
      requestOptions.headers = allHeaders;
    }

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        requestOptions.data = postData.paramsObj;
        break;

      case 'application/json':
        if (postData.jsonObj) {
          requestOptions.data = postData.jsonObj;
        }
        break;

      case 'multipart/form-data':
        push('const form = new FormData();');

        postData.params?.forEach(param => {
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

    const optionString = stringifyObject(requestOptions, { indent: '  ', inlineCharacterLimit: 80 }).replace('"[form]"', 'form');
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
