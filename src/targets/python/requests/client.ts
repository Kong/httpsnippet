/**
 * @description
 * HTTP code snippet generator for Python using Requests
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { CodeBuilder } from '../../../helpers/code-builder';
import { Client } from '../../targets';
import { literalRepresentation } from '../helpers';

export interface RequestsOptions {
  pretty?: true;
}

export const requests: Client<RequestsOptions> = {
  info: {
    key: 'requests',
    title: 'Requests',
    link: 'http://docs.python-requests.org/en/latest/api/#requests.request',
    description: 'Requests HTTP library',
  },
  convert: ({ queryObj, url, postData, allHeaders, method }, options) => {
    const opts = {
      indent: '    ',
      pretty: true,
      ...options,
    };
    // Start snippet
    const { push, blank, join } = new CodeBuilder({ indent: opts.indent });

    // Import requests
    push('import requests');
    blank();

    // Set URL
    push(`url = "${url}"`);
    blank();

    // Construct query string
    let qs;
    if (Object.keys(queryObj).length) {
      qs = `querystring = ${JSON.stringify(queryObj)}`;

      push(qs);
      blank();
    }

    // Construct payload
    let hasPayload = false;
    let jsonPayload = false;
    switch (postData.mimeType) {
      case 'application/json':
        if (postData.jsonObj) {
          push(`payload = ${literalRepresentation(postData.jsonObj, opts)}`);
          jsonPayload = true;
          hasPayload = true;
        }
        break;

      default: {
        const payload = JSON.stringify(postData.text);
        if (payload) {
          push(`payload = ${payload}`);
          hasPayload = true;
        }
      }
    }

    // Construct headers
    const headers = allHeaders;
    const headerCount = Object.keys(headers).length;

    if (headerCount === 1) {
      for (const header in headers) {
        push(`headers = {"${header}": "${headers[header]}"}`);
        blank();
      }
    } else if (headerCount > 1) {
      let count = 1;

      push('headers = {');

      for (const header in headers) {
        if (count++ !== headerCount) {
          push(`"${header}": "${headers[header]}",`, 1);
        } else {
          push(`"${header}": "${headers[header]}"`, 1);
        }
      }

      push('}');
      blank();
    }

    // Construct request
    let request = `response = requests.request("${method}", url`;

    if (hasPayload) {
      if (jsonPayload) {
        request += ', json=payload';
      } else {
        request += ', data=payload';
      }
    }

    if (headerCount > 0) {
      request += ', headers=headers';
    }

    if (qs) {
      request += ', params=querystring';
    }

    request += ')';

    push(request);
    blank();

    // Print response
    push('print(response.text)');

    return join();
  },
};
