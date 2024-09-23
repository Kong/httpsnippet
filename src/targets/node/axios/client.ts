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
  convert: ({ method, fullUrl, allHeaders, postData }, options) => {
    const opts = {
      indent: '  ',
      ...options,
    };
    const { blank, join, push, addPostProcessor } = new CodeBuilder({ indent: opts.indent });

    push("import axios from 'axios';");
    blank();

    const reqOpts: Record<string, any> = {
      method,
      url: fullUrl,
    };

    if (Object.keys(allHeaders).length) {
      reqOpts.headers = allHeaders;
    }

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        if (postData.params) {
          push('const encodedParams = new URLSearchParams();');
          postData.params.forEach(param => {
            push(`encodedParams.set('${param.name}', '${param.value}');`);
          });

          blank();

          reqOpts.data = 'encodedParams,';
          addPostProcessor(code => code.replace(/'encodedParams,'/, 'encodedParams,'));
        }

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
    push(`const options = ${stringifiedOptions};`);
    blank();

    push('axios');
    push('.request(options)', 1);
    push('.then(res => console.log(res.data))', 1);
    push('.catch(err => console.error(err));', 1);

    return join();
  },
};
