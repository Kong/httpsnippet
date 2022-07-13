/**
 * @description
 * HTTP code snippet generator for R using httr
 *
 * @author
 * @gabrielakoreeda
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

export interface HttrOptions {
  /** @default '  ' */
  indent?: string;
}

import { CodeBuilder } from '../../../helpers/code-builder';
import { Client } from '../../targets';

export const httr: Client = {
  info: {
    key: 'httr',
    title: 'httr',
    link: 'https://cran.r-project.org/web/packages/httr/vignettes/quickstart.html',
    description: 'httr: Tools for Working with URLs and HTTP',
  },
  convert: ({ url, queryObj, queryString, postData, allHeaders, method }, options = {}) => {
    // Start snippet
    const { push, blank, join } = new CodeBuilder({
      indent: options.indent ?? '  ',
    });

    // Import httr
    push('library(httr)');
    blank();

    // Set URL
    push(`url <- "${url}"`);
    blank();

    // Construct query string
    const qs = queryObj;
    delete queryObj.key;

    const entries = Object.entries(qs);
    const entriesCount = entries.length;

    if (entriesCount === 1) {
      const entry = entries[0];
      push(`queryString <- list(${entry[0]} = "${entry[1]}")`);
      blank();
    } else if (entriesCount > 1) {
      push('queryString <- list(');

      entries.forEach(([key, value], i) => {
        const isLastItem = i !== entriesCount - 1;
        const maybeComma = isLastItem ? ',' : '';
        push(`${key} = "${value}"${maybeComma}`, 1);
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
    const headers = [];
    let cookies;
    let accept;

    for (const head in allHeaders) {
      if (head.toLowerCase() === 'accept') {
        accept = `, accept("${allHeaders[head]}")`;
      } else if (head.toLowerCase() === 'cookie') {
        cookies = `, set_cookies(\`${String(allHeaders[head])
          .replace(/;/g, '", `')
          .replace(/` /g, '`')
          .replace(/[=]/g, '` = "')}")`;
      } else if (head.toLowerCase() !== 'content-type') {
        headers.push(`'${head}' = '${allHeaders[head]}'`);
      }
    }

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
