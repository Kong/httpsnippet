/**
 * @description
 * HTTP code snippet generator for the Shell using cURL.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import type { Client } from '../../targets';
import type { Param } from 'har-format';
import { CodeBuilder } from '../../../helpers/code-builder';
import { getHeaderName, isMimeTypeJSON } from '../../../helpers/headers';
import { quote } from '../../../helpers/shell';

export interface CurlOptions {
  short?: boolean;
  binary?: boolean;
  globOff?: boolean;
  indent?: string | false;
}

export const curl: Client<CurlOptions> = {
  info: {
    key: 'curl',
    title: 'cURL',
    link: 'http://curl.haxx.se/',
    description: 'cURL is a command line tool and library for transferring data with URL syntax',
  },
  convert: ({ fullUrl, method, httpVersion, headersObj, allHeaders, postData }, options) => {
    const opts = {
      indent: '  ',
      short: false,
      binary: false,
      globOff: false,
      escapeBrackets: false,
      ...options,
    };
    const { push, join } = new CodeBuilder({
      ...(typeof opts.indent === 'string' ? { indent: opts.indent } : {}),
      join: opts.indent !== false ? ` \\\n${opts.indent}` : ' ',
    });

    const globOption = opts.short ? '-g' : '--globoff';
    const requestOption = opts.short ? '-X' : '--request';
    let formattedUrl = quote(fullUrl);

    if (opts.escapeBrackets) {
      formattedUrl = formattedUrl.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
    }

    push(`curl ${requestOption} ${method}`);
    if (opts.globOff) {
      formattedUrl = unescape(formattedUrl);
      push(globOption);
    }
    push(`${opts.short ? '' : '--url '}${formattedUrl}`);

    if (httpVersion === 'HTTP/1.0') {
      push(opts.short ? '-0' : '--http1.0');
    }

    // if multipart form data, we want to remove the boundary
    if (postData.mimeType === 'multipart/form-data') {
      const contentTypeHeaderName = getHeaderName(headersObj, 'content-type');
      if (contentTypeHeaderName) {
        const contentTypeHeader = headersObj[contentTypeHeaderName];
        if (contentTypeHeaderName && contentTypeHeader) {
          // remove the leading semi colon and boundary
          // up to the next semi colon or the end of string
          const noBoundary = String(contentTypeHeader).replace(/; boundary.+?(?=(;|$))/, '');

          // replace the content-type header with no boundary in both headersObj and allHeaders
          headersObj[contentTypeHeaderName] = noBoundary;
          allHeaders[contentTypeHeaderName] = noBoundary;
        }
      }
    }

    // construct headers
    Object.keys(headersObj)
      .sort()
      .forEach(key => {
        const header = `${key}: ${headersObj[key]}`;
        push(`${opts.short ? '-H' : '--header'} ${quote(header)}`);
      });

    if (allHeaders.cookie) {
      push(`${opts.short ? '-b' : '--cookie'} ${quote(allHeaders.cookie as string)}`);
    }

    // construct post params
    switch (postData.mimeType) {
      case 'multipart/form-data':
        postData.params?.forEach((param: Param) => {
          let post = '';
          if (param.fileName) {
            post = `${param.name}=@${param.fileName}`;
          } else {
            post = `${param.name}=${param.value}`;
          }

          push(`${opts.short ? '-F' : '--form'} ${quote(post)}`);
        });
        break;

      case 'application/x-www-form-urlencoded':
        if (postData.params) {
          postData.params.forEach((param: Param) => {
            push(
              `${opts.binary ? '--data-binary' : opts.short ? '-d' : '--data'} ${quote(`${param.name}=${param.value}`)}`
            );
          });
        } else {
          push(`${opts.binary ? '--data-binary' : opts.short ? '-d' : '--data'} ${quote(postData.text)}`);
        }
        break;

      default:
        // raw request body
        if (!postData.text) {
          break;
        }

        // eslint-disable-next-line no-case-declarations -- builtPayload is only used here.
        let builtPayload = false;

        // If we're dealing with a JSON variant, and our payload is JSON let's make it look a little
        // nicer.
        if (isMimeTypeJSON(postData.mimeType)) {
          // If our postData is less than 20 characters, let's keep it all on one line so as to not
          // make the snippet overly lengthy
          if (postData.text.length > 20) {
            try {
              const jsonPayload = JSON.parse(postData.text);

              // If the JSON object has a single quote we should prepare it inside of a HEREDOC
              // because the single quote in something like `string's` can't be escaped when used
              // with `--data`.
              //
              // Basically this boils down to `--data @- <<EOF...EOF` vs `--data '...'`.
              builtPayload = true;

              if (postData.text.indexOf("'") > 0) {
                push(
                  `${opts.binary ? '--data-binary' : opts.short ? '-d' : '--data'} @- <<EOF\n${JSON.stringify(
                    jsonPayload,
                    null,
                    opts.indent ? opts.indent : ' '
                  )}\nEOF`
                );
              } else {
                push(
                  `${opts.binary ? '--data-binary' : opts.short ? '-d' : '--data'} '\n${JSON.stringify(
                    jsonPayload,
                    null,
                    opts.indent ? opts.indent : ' '
                  )}\n'`
                );
              }
            } catch (err) {
              // no-op
            }
          }
        }

        if (!builtPayload) {
          push(`${opts.binary ? '--data-binary' : opts.short ? '-d' : '--data'} ${quote(postData.text)}`);
        }
    }

    return join();
  },
};
