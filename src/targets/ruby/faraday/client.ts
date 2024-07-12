import { CodeBuilder } from '../../../helpers/code-builder';
import { escapeForSingleQuotes } from '../../../helpers/escape';
import { Client } from '../../targets';

export const faraday: Client = {
  info: {
    key: 'faraday',
    title: 'faraday',
    link: 'https://github.com/lostisland/faraday',
    description: 'Faraday HTTP client',
  },
  convert: ({ uriObj, queryObj, method: rawMethod, postData, allHeaders }) => {
    const { push, blank, join } = new CodeBuilder();

    // To support custom methods we check for the supported methods
    // and if doesn't exist then we build a custom class for it
    const method = rawMethod.toUpperCase();
    const methods = [
      'GET',
      'POST',
      'HEAD',
      'DELETE',
      'PATCH',
      'PUT',
      'OPTIONS',
      'COPY',
      'LOCK',
      'UNLOCK',
      'MOVE',
      'TRACE',
    ];

    if (!methods.includes(method)) {
      push(`# Faraday cannot currently run ${method} requests. Please use another client.`);
      return join();
    }

    push("require 'faraday'");
    blank();

    // Write body to beginning of script
    if (postData.mimeType === 'application/x-www-form-urlencoded') {
      if (postData.params) {
        push(`data = {`);
        postData.params.forEach(param => {
          push(`  :${param.name} => ${JSON.stringify(param.value)},`);
        });
        push(`}`);
        blank();
      }
    }

    push(`conn = Faraday.new(`);
    push(`  url: '${uriObj.protocol}//${uriObj.host}',`);
    if (allHeaders['content-type'] || allHeaders['Content-Type']) {
      push(
        `  headers: {'Content-Type' => '${
          allHeaders['content-type'] || allHeaders['Content-Type']
        }'}`,
      );
    }
    push(`)`);

    blank();
    push(`response = conn.${method.toLowerCase()}('${uriObj.pathname}') do |req|`);

    const headers = Object.keys(allHeaders);
    if (headers.length) {
      headers.forEach(key => {
        if (key.toLowerCase() !== 'content-type') {
          push(`  req.headers['${key}'] = '${escapeForSingleQuotes(allHeaders[key])}'`);
        }
      });
    }

    Object.keys(queryObj).forEach(name => {
      const value = queryObj[name];
      if (Array.isArray(value)) {
        push(`  req.params['${name}'] = ${JSON.stringify(value)}`);
      } else {
        push(`  req.params['${name}'] = '${value}'`);
      }
    });

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        if (postData.params) {
          push(`  req.body = URI.encode_www_form(data)`);
        }
        break;

      case 'application/json':
        if (postData.jsonObj) {
          push(`  req.body = ${JSON.stringify(postData.text)}`);
        }
        break;

      default:
        if (postData.text) {
          push(`  req.body = ${JSON.stringify(postData.text)}`);
        }
    }

    push('end');
    blank();
    push('puts response.status');
    push('puts response.body');

    return join();
  },
};
