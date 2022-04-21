/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { CodeBuilder } from '../../../helpers/code-builder';
import { getHeader, getHeaderName, hasHeader } from '../../../helpers/headers';
import { Client } from '../../targets';
import { convertType } from '../helpers';

export interface Http2Options {
  closingTag?: boolean;
  noTags?: boolean;
  shortTags?: boolean;
}

export const http2: Client<Http2Options> = {
  info: {
    key: 'http2',
    title: 'HTTP v2',
    link: 'http://devel-m6w6.rhcloud.com/mdref/http',
    description: 'PHP with pecl/http v2',
  },
  convert: ({ postData, headersObj, method, queryObj, cookiesObj, url }, options) => {
    const opts = {
      closingTag: false,
      indent: '  ',
      noTags: false,
      shortTags: false,
      ...options,
    };

    const { push, blank, join } = new CodeBuilder({ indent: opts.indent });
    let hasBody = false;

    if (!opts.noTags) {
      push(opts.shortTags ? '<?' : '<?php');
      blank();
    }

    push('$client = new http\\Client;');
    push('$request = new http\\Client\\Request;');
    blank();

    switch (postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        push('$body = new http\\Message\\Body;');
        push(
          `$body->append(new http\\QueryString(${convertType(postData.paramsObj, opts.indent)}));`,
        );
        blank();
        hasBody = true;
        break;

      case 'multipart/form-data': {
        const files: {
          name: string;
          type: string | undefined;
          file: string;
          data: string | undefined;
          [anything: string]: string | undefined;
        }[] = [];
        const fields: Record<string, any> = {};
        postData.params?.forEach(({ name, fileName, value, contentType }) => {
          if (fileName) {
            files.push({
              name,
              type: contentType,
              file: fileName,
              data: value,
            });
            return;
          }
          if (value) {
            fields[name] = value;
          }
        });

        const field = Object.keys(fields).length ? convertType(fields, opts.indent) : 'null';
        const formValue = files.length ? convertType(files, opts.indent) : 'null';

        push('$body = new http\\Message\\Body;');
        push(`$body->addForm(${field}, ${formValue});`);

        // remove the contentType header
        if (hasHeader(headersObj, 'content-type')) {
          if (getHeader(headersObj, 'content-type')?.indexOf('boundary')) {
            const headerName = getHeaderName(headersObj, 'content-type');
            if (headerName) {
              delete headersObj[headerName];
            }
          }
        }

        blank();

        hasBody = true;
        break;
      }

      default:
        if (postData.text) {
          push('$body = new http\\Message\\Body;');
          push(`$body->append(${convertType(postData.text)});`);
          blank();
          hasBody = true;
        }
    }

    push(`$request->setRequestUrl(${convertType(url)});`);
    push(`$request->setRequestMethod(${convertType(method)});`);

    if (hasBody) {
      push('$request->setBody($body);');
      blank();
    }

    if (Object.keys(queryObj).length) {
      push(`$request->setQuery(new http\\QueryString(${convertType(queryObj, opts.indent)}));`);
      blank();
    }

    if (Object.keys(headersObj).length) {
      push(`$request->setHeaders(${convertType(headersObj, opts.indent)});`);
      blank();
    }

    if (Object.keys(cookiesObj).length) {
      blank();
      push(`$client->setCookies(${convertType(cookiesObj, opts.indent)});`);
      blank();
    }

    push('$client->enqueue($request)->send();');
    push('$response = $client->getResponse();');
    blank();
    push('echo $response->getBody();');

    if (!opts.noTags && opts.closingTag) {
      blank();
      push('?>');
    }

    return join();
  },
};
