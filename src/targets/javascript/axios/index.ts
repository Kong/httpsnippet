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

export interface AxiosOptions {
  indent?: string;
}

export const axios: Client<AxiosOptions> = {
  info: {
    key: 'axios',
    title: 'Axios',
    link: 'https://github.com/axios/axios',
    description: 'Promise based HTTP client for the browser and node.js',
  },
  convert: (source, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { blank, push, join } = new CodeBuilder(opts.indent);

    push(`import axios from 'axios';`);
    blank();

    const requestOptions: Record<string, any> = {
      method: source.method,
      url: source.url,
    };

    if (Object.keys(source.queryObj).length) {
      requestOptions.params = source.queryObj;
    }

    if (Object.keys(source.allHeaders).length) {
      requestOptions.headers = source.allHeaders;
    }

    switch (source.postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        requestOptions.data = source.postData.paramsObj;
        break;

      case 'application/json':
        if (source.postData.jsonObj) {
          requestOptions.data = source.postData.jsonObj;
        }
        break;

      case 'multipart/form-data':
        push('const form = new FormData();');

        source.postData.params.forEach(function (param) {
          push(`form.append('${param.name}', '${param.value || param.fileName || ''}');`);
        });

        blank();

        requestOptions.data = '[form]';
        break;

      default:
        if (source.postData.text) {
          requestOptions.data = source.postData.text;
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
