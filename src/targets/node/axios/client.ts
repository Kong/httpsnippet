/**
 * @description
 * HTTP code snippet generator for Javascript & Node.js using Axios.
 *
 * @author
 * @rohit-gohri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import stringifyObject from 'stringify-object';
import { Client } from '../../targets';
import { CodeBuilder } from '../../../helpers/code-builder';

export const axios: Client = {
  info: {
    key: 'axios',
    title: 'Axios',
    link: 'https://github.com/axios/axios',
    description: 'Promise based HTTP client for the browser and node.js',
  },
  convert: ({ method, url, queryObj, allHeaders, postData }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };

    const { blank, join, push } = new CodeBuilder({ indent: opts.indent });

    push(`var axios = require('axios').default;`);
    blank();

    const reqOpts: Record<string, any> = {
      method,
      url,
    };

    if (Object.keys(queryObj).length) {
      reqOpts.params = queryObj;
    }

    if (Object.keys(allHeaders).length) {
      reqOpts.headers = allHeaders;
    }

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        reqOpts.data = postData.paramsObj;
        break;

      case 'application/json':
        if (postData.jsonObj) {
          reqOpts.data = postData.jsonObj;
        }
        break;

      default:
        if (postData.text) {
          reqOpts.data = postData.text;
        }
    }

    const stringifiedOptions = stringifyObject(reqOpts, { indent: '  ', inlineCharacterLimit: 80 });
    push(`var options = ${stringifiedOptions};`);
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
