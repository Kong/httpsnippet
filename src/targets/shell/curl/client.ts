/**
 * @description
 *
 * HTTP code snippet generator for the Shell using cURL.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { CodeBuilder } from '../../../helpers/code-builder';
import { getHeader, getHeaderName, isMimeTypeJSON } from '../../../helpers/headers';
import { quote } from '../../../helpers/shell';
import { Client } from '../../targets';

export interface CurlOptions {
  binary?: boolean;
  globOff?: boolean;
  indent?: string | false;
  insecureSkipVerify?: boolean;
  prettifyJson?: boolean;
  short?: boolean;
}

/**
 * This is a const record with keys that correspond to the long names and values that correspond to the short names for cURL arguments.
 */
const params = {
  'http1.0': '0',
  'url ': '',
  cookie: 'b',
  data: 'd',
  form: 'F',
  globoff: 'g',
  header: 'H',
  insecure: 'k',
  request: 'X',
} as const;

const getArg = (short: boolean) => (longName: keyof typeof params) => {
  if (short) {
    const shortName = params[longName];
    if (!shortName) {
      return '';
    }
    return `-${shortName}`;
  }
  return `--${longName}`;
};

export const curl: Client<CurlOptions> = {
  info: {
    key: 'curl',
    title: 'cURL',
    link: 'http://curl.haxx.se/',
    description: 'cURL is a command line tool and library for transferring data with URL syntax',
  },
  convert: ({ fullUrl, method, httpVersion, headersObj, allHeaders, postData }, options = {}) => {
    const {
      binary = false,
      globOff = false,
      indent = '  ',
      insecureSkipVerify = false,
      prettifyJson = false,
      short = false,
    } = options;

    const { push, join } = new CodeBuilder({
      ...(typeof indent === 'string' ? { indent: indent } : {}),
      join: indent !== false ? ` \\\n${indent}` : ' ',
    });

    const arg = getArg(short);

    let formattedUrl = quote(fullUrl);

    push(`curl ${arg('request')} ${method}`);
    if (globOff) {
      formattedUrl = unescape(formattedUrl);
      push(arg('globoff'));
    }
    push(`${arg('url ')}${formattedUrl}`);

    if (insecureSkipVerify) {
      push(arg('insecure'));
    }

    if (httpVersion === 'HTTP/1.0') {
      push(arg('http1.0'));
    }

    if (getHeader(allHeaders, 'accept-encoding')) {
      // note: there is no shorthand for this cURL option
      push('--compressed');
    }

    // if multipart form data, we want to remove the boundary
    if (postData.mimeType === 'multipart/form-data') {
      const contentTypeHeaderName = getHeaderName(headersObj, 'content-type');
      if (contentTypeHeaderName) {
        const contentTypeHeader = headersObj[contentTypeHeaderName];
        if (contentTypeHeaderName && contentTypeHeader) {
          // remove the leading semi colon and boundary
          // up to the next semi colon or the end of string
          // @ts-expect-error it is a reality that the headersObj can have values which are string arrays.  This is a genuine bug that this case isn't handled or tested.  It is, however tested in `reducer.test.ts`.  Go check that out to see more.
          const noBoundary = contentTypeHeader.replace(/; boundary.+?(?=(;|$))/, '');

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
        push(`${arg('header')} ${quote(header)}`);
      });

    if (allHeaders.cookie) {
      push(`${arg('cookie')} ${quote(allHeaders.cookie as string)}`);
    }

    // construct post params
    switch (postData.mimeType) {
      case 'multipart/form-data':
        postData.params?.forEach(param => {
          let post = '';
          if (param.fileName) {
            post = `${param.name}=@${param.fileName}`;
          } else {
            post = `${param.name}=${param.value}`;
          }

          push(`${arg('form')} ${quote(post)}`);
        });
        break;

      case 'application/x-www-form-urlencoded':
        if (postData.params) {
          postData.params.forEach(param => {
            const unencoded = param.name;
            const encoded = encodeURIComponent(param.name);
            const needsEncoding = encoded !== unencoded;
            const name = needsEncoding ? encoded : unencoded;
            const flag = binary ? '--data-binary' : `--data${needsEncoding ? '-urlencode' : ''}`;
            push(`${flag} ${quote(`${name}=${param.value}`)}`);
          });
        } else {
          push(`${binary ? '--data-binary' : arg('data')} ${quote(postData.text)}`);
        }
        break;

      default: {
        // raw request body
        if (!postData.text) {
          break;
        }

        const flag = binary ? '--data-binary' : arg('data');

        let builtPayload = false;
        // If we're dealing with a JSON variant, and our payload is JSON let's make it look a little nicer.
        if (isMimeTypeJSON(postData.mimeType)) {
          // If our postData is less than 20 characters, let's keep it all on one line so as to not make the snippet overly lengthy.
          const couldBeJSON = postData.text.length > 2;
          if (couldBeJSON && prettifyJson) {
            try {
              const jsonPayload = JSON.parse(postData.text);

              // If the JSON object has a single quote we should prepare it inside of a HEREDOC because the single quote in something like `string's` can't be escaped when used with `--data`.
              //
              // Basically this boils down to `--data @- <<EOF...EOF` vs `--data '...'`.
              builtPayload = true;

              const payload = JSON.stringify(jsonPayload, undefined, indent as string);
              if (postData.text.indexOf("'") > 0) {
                push(`${flag} @- <<EOF\n${payload}\nEOF`);
              } else {
                push(`${flag} '\n${payload}\n'`);
              }
            } catch (err) {
              // no-op
            }
          }
        }

        if (!builtPayload) {
          push(`${flag} ${quote(postData.text)}`);
        }
      }
    }

    return join();
  },
};
