/**
 * @description
 * HTTP code snippet generator for R using httr
 *
 * @author
 * @gabrielakoreeda
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { Client } from '../../targets';
import { CodeBuilder } from '../../../helpers/code-builder';

export const httr: Client = {
  info: {
    key: 'httr',
    title: 'httr',
    link: 'https://cran.r-project.org/web/packages/httr/vignettes/quickstart.html',
    description: 'httr: Tools for Working with URLs and HTTP',
  },
  convert: ({ url, queryObj, queryString, postData, allHeaders, method }) => {
    // Start snippet
    const { push, blank, join } = new CodeBuilder();

    // Import httr
    push('library(httr)');
    blank();

    // Set URL
    push(`url <- "${url}"`);
    blank();

    // Construct query string
    const qs = queryObj;
    const queryCount = Object.keys(qs).length;
    delete queryObj.key;

    if (queryString.length === 1) {
      push(`queryString <- list(${Object.keys(qs)} = "${Object.values(qs).toString()}")`);
      blank();
    } else if (queryString.length > 1) {
      let count = 1;

      push('queryString <- list(');

      for (const query in qs) {
        if (count++ !== queryCount - 1) {
          push(`  ${query} = "${qs[query].toString()}",`);
        } else {
          push(`  ${query} = "${qs[query].toString()}"`);
        }
      }

      push(')');
      blank();
    }

    // Construct payload
    const payload = JSON.stringify(postData.text);

    if (payload) {
      push(`payload <- ${payload}`);
      blank();
    }

    // Define encode
    if (postData.text || postData.jsonObj || postData.params) {
      switch (postData.mimeType) {
        case 'application/x-www-form-urlencoded':
          push('encode <- "form"');
          blank();
          break;

        case 'application/json':
          push('encode <- "json"');
          blank();
          break;

        case 'multipart/form-data':
          push('encode <- "multipart"');
          blank();
          break;

        default:
          push('encode <- "raw"');
          blank();
          break;
      }
    }

    // Construct headers
    const headers = allHeaders;
    let headerCount = Object.keys(headers).length;
    let header = '';
    let cookies;
    let accept;

    for (const head in headers) {
      if (head.toLowerCase() === 'accept') {
        accept = `, accept("${headers[head]}")`;
        headerCount = headerCount - 1;
      } else if (head.toLowerCase() === 'cookie') {
        cookies = `, set_cookies(\`${String(headers[head]).replace(/;/g, '", `').replace(/` /g, '`').replace(/=/g, '` = "')}")`;
        headerCount = headerCount - 1;
      } else if (head.toLowerCase() !== 'content-type') {
        header = `${header + head.replace('-', '_')} = '${headers[head]}`;
        if (headerCount > 1) {
          header = `${header}', `;
        }
      }
    }

    // Construct request
    let request = `response <- VERB("${method}", url`;

    if (payload) {
      request += ', body = payload';
    }

    if (header !== '') {
      request += `, add_headers(${header}')`;
    }

    if (queryString.length) {
      request += ', query = queryString';
    }

    request += `, content_type("${postData.mimeType}")`;

    if (typeof accept !== 'undefined') {
      request += accept;
    }

    if (typeof cookies !== 'undefined') {
      request += cookies;
    }

    if (postData.text || postData.jsonObj || postData.params) {
      request += ', encode = encode';
    }

    request += ')';

    push(request);

    blank();
    // Print response
    push('content(response, "text")');

    return join();
  },
};
