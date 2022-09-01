/**
 * @description
 * HTTP code snippet generator for R using httr
 *
 * @author
 * @gabrielakoreeda
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import type { Client } from '../../targets';

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
    delete queryObj.key;

    const queryCount = Object.keys(qs).length;
    if (queryString.length === 1) {
      push(`queryString <- list(${Object.keys(qs)} = "${Object.values(qs).toString()}")`);
      blank();
    } else if (queryString.length > 1) {
      push('queryString <- list(');

      Object.keys(qs).forEach((query, i) => {
        if (i !== queryCount - 1) {
          push(`  ${query} = "${qs[query].toString()}",`);
        } else {
          push(`  ${query} = "${qs[query].toString()}"`);
        }
      });

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
    const headers: string[] = [];
    let cookies;
    let accept;

    Object.keys(allHeaders).forEach(header => {
      if (header.toLowerCase() === 'accept') {
        accept = `, accept("${allHeaders[header]}")`;
      } else if (header.toLowerCase() === 'cookie') {
        cookies = `, set_cookies(\`${String(allHeaders[header])
          .replace(/;/g, '", `')
          .replace(/` /g, '`')
          .replace(/[=]/g, '` = "')}")`;
      } else if (header.toLowerCase() !== 'content-type') {
        headers.push(`'${header}' = '${allHeaders[header]}'`);
      }
    });

    // Construct request
    let request = `response <- VERB("${method}", url`;

    if (payload) {
      request += ', body = payload';
    }

    if (headers.length) {
      request += `, add_headers(${headers.join(', ')})`;
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
