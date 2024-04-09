import type { ReducedHelperObject } from './helpers/reducer.js';
import type { ClientId, TargetId } from './targets/index.js';
import type { Param, PostDataCommon, Request as NpmHarRequest } from 'har-format';
import type { UrlWithParsedQuery } from 'node:url';

import { format as urlFormat, parse as urlParse } from 'node:url';

import { stringify as queryStringify } from 'qs';

import { getHeaderName } from './helpers/headers.js';
import { reducer } from './helpers/reducer.js';
import { targets } from './targets/index.js';

export { availableTargets, extname } from './helpers/utils.js';
export { addTarget, addTargetClient, addClientPlugin } from './targets/index.js';

/** is this wrong?  yes.  according to the spec (http://www.softwareishard.com/blog/har-12-spec/#postData) it's technically wrong since `params` and `text` are (by the spec) mutually exclusive.  However, in practice, this is not what is often the case.
 *
 * In general, this library takes a _descriptive_ rather than _perscriptive_ approach (see https://amyrey.web.unc.edu/classes/ling-101-online/tutorials/understanding-prescriptive-vs-descriptive-grammar/).
 *
 * Then, in addition to that, it really adds to complexity with TypeScript (TypeScript takes this constraint very very seriously) in a way that's not actually super useful.  So, we treat this object as though it could have both or either of `params` and/or `text`.
 */
type PostDataBase = PostDataCommon & {
  params?: Param[];
  text?: string;
};

export type HarRequest = Omit<NpmHarRequest, 'postData'> & { postData: PostDataBase };

export interface RequestExtras {
  allHeaders: ReducedHelperObject;
  cookiesObj: ReducedHelperObject;
  fullUrl: string;
  headersObj: ReducedHelperObject;
  postData: PostDataBase & {
    boundary?: string;
    jsonObj?: ReducedHelperObject;
    paramsObj?: ReducedHelperObject;
  };
  queryObj: ReducedHelperObject;
  uriObj: UrlWithParsedQuery;
}

export type Request = HarRequest & RequestExtras;

interface Entry {
  request: Partial<HarRequest>;
}

interface HarEntry {
  log: {
    creator: {
      name: string;
      version: string;
    };
    entries: Entry[];
    version: string;
  };
}

export interface HTTPSnippetOptions {
  harIsAlreadyEncoded?: boolean;
}

const isHarEntry = (value: any): value is HarEntry =>
  typeof value === 'object' &&
  'log' in value &&
  typeof value.log === 'object' &&
  'entries' in value.log &&
  Array.isArray(value.log.entries);

export class HTTPSnippet {
  initCalled = false;

  entries: Entry[] = [];

  requests: Request[] = [];

  options: HTTPSnippetOptions = {};

  constructor(input: HarEntry | HarRequest, opts: HTTPSnippetOptions = {}) {
    this.options = {
      harIsAlreadyEncoded: false,
      ...opts,
    };

    // prep the main container
    this.requests = [];

    // is it har?
    if (isHarEntry(input)) {
      this.entries = input.log.entries;
    } else {
      this.entries = [
        {
          request: input,
        },
      ];
    }
  }

  init() {
    this.initCalled = true;

    this.requests = this.entries.map(({ request }) => {
      // add optional properties to make validation successful
      const req = {
        bodySize: 0,
        headersSize: 0,
        headers: [],
        cookies: [],
        httpVersion: 'HTTP/1.1',
        queryString: [],
        postData: {
          mimeType: request.postData?.mimeType || 'application/octet-stream',
        },
        ...request,
      };

      // Per the HAR spec `mimeType` needs to always be present if we have a `postData` object.
      if (req.postData && !req.postData.mimeType) {
        req.postData.mimeType = 'application/octet-stream';
      }

      return this.prepare(req as HarRequest, this.options);
    });

    return this;
  }

  prepare(harRequest: HarRequest, options: HTTPSnippetOptions) {
    const request: Request = {
      ...harRequest,
      fullUrl: '',
      uriObj: {} as UrlWithParsedQuery,
      queryObj: {},
      headersObj: {},
      cookiesObj: {},
      allHeaders: {},
    };

    // construct query objects
    if (request.queryString && request.queryString.length) {
      request.queryObj = request.queryString.reduce(reducer, {});
    }

    // construct headers objects
    if (request.headers && request.headers.length) {
      const http2VersionRegex = /^HTTP\/2/;
      request.headersObj = request.headers.reduce((accumulator, { name, value }) => {
        const headerName = http2VersionRegex.exec(request.httpVersion) ? name.toLocaleLowerCase() : name;
        return {
          ...accumulator,
          [headerName]: value,
        };
      }, {});
    }

    // construct headers objects
    if (request.cookies && request.cookies.length) {
      request.cookiesObj = request.cookies.reduceRight(
        (accumulator, { name, value }) => ({
          ...accumulator,
          [name]: value,
        }),
        {},
      );
    }

    // construct Cookie header
    const cookies = request.cookies?.map(({ name, value }) => {
      if (options.harIsAlreadyEncoded) {
        return `${name}=${value}`;
      }

      return `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    });

    if (cookies?.length) {
      request.allHeaders.cookie = cookies.join('; ');
    }

    switch (request.postData.mimeType) {
      case 'multipart/mixed':
      case 'multipart/related':
      case 'multipart/form-data':
      case 'multipart/alternative':
        // reset values
        request.postData.text = '';
        request.postData.mimeType = 'multipart/form-data';

        if (request.postData?.params) {
          const boundary = '---011000010111000001101001'; // this is binary for "api" (easter egg)
          const carriage = `${boundary}--`;
          const rn = '\r\n';

          /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
          const escape = (str: string) => str.replace(/\n/g, '%0A').replace(/\r/g, '%0D').replace(/"/g, '%22');
          const normalizeLinefeeds = (value: string) => value.replace(/\r?\n|\r/g, '\r\n');

          const payload = [`--${boundary}`];
          request.postData?.params.forEach((param, i) => {
            const name = param.name;
            const value = param.value || '';
            const filename = param.fileName || null;
            const contentType = param.contentType || 'application/octet-stream';

            if (filename) {
              payload.push(
                `Content-Disposition: form-data; name="${escape(normalizeLinefeeds(name))}"; filename="${filename}"`,
              );
              payload.push(`Content-Type: ${contentType}`);
            } else {
              payload.push(`Content-Disposition: form-data; name="${escape(normalizeLinefeeds(name))}"`);
            }

            payload.push('');
            payload.push(normalizeLinefeeds(value));

            if (i !== (request.postData.params as Param[]).length - 1) {
              payload.push(`--${boundary}`);
            }
          });

          payload.push(`--${carriage}`);

          request.postData.boundary = boundary;
          request.postData.text = payload.join(rn);

          // Since headers are case-sensitive we need to see if there's an existing `Content-Type` header that we can override.
          const contentTypeHeader = getHeaderName(request.headersObj, 'content-type') || 'content-type';

          request.headersObj[contentTypeHeader] = `multipart/form-data; boundary=${boundary}`;
        }
        break;

      case 'application/x-www-form-urlencoded':
        if (!request.postData.params) {
          request.postData.text = '';
        } else {
          // @ts-expect-error the `har-format` types make this challenging
          request.postData.paramsObj = request.postData.params.reduce(reducer, {});

          // always overwrite
          request.postData.text = queryStringify(request.postData.paramsObj);
        }
        break;

      case 'text/json':
      case 'text/x-json':
      case 'application/json':
      case 'application/x-json':
        request.postData.mimeType = 'application/json';

        if (request.postData.text) {
          try {
            request.postData.jsonObj = JSON.parse(request.postData.text);
          } catch (e) {
            // force back to `text/plain` if headers have proper content-type value, then this should also work
            request.postData.mimeType = 'text/plain';
          }
        }
        break;
    }

    // create allHeaders object
    const allHeaders = {
      ...request.allHeaders,
      ...request.headersObj,
    };

    const urlWithParsedQuery = urlParse(request.url, true, true); //?

    // query string key/value pairs in with literal querystrings containd within the url
    request.queryObj = {
      ...request.queryObj,
      ...(urlWithParsedQuery.query as ReducedHelperObject),
    }; //?

    // reset uriObj values for a clean url
    let search;
    if (options.harIsAlreadyEncoded) {
      search = queryStringify(request.queryObj, {
        encode: false,
        indices: false,
      });
    } else {
      search = queryStringify(request.queryObj, {
        indices: false,
      });
    }

    const uriObj = {
      ...urlWithParsedQuery,
      query: request.queryObj,
      search,
      path: search ? `${urlWithParsedQuery.pathname}?${search}` : urlWithParsedQuery.pathname,
    };

    // keep the base url clean of queryString
    const url = urlFormat({
      ...urlWithParsedQuery,
      query: null,
      search: null,
    }); //?

    const fullUrl = urlFormat({
      ...urlWithParsedQuery,
      ...uriObj,
    }); //?

    return {
      ...request,
      allHeaders,
      fullUrl,
      url,
      uriObj,
    };
  }

  convert(targetId: TargetId, clientId?: ClientId, options?: any) {
    if (!this.initCalled) {
      this.init();
    }

    if (!options && clientId) {
      options = clientId;
    }

    const target = targets[targetId];
    if (!target) {
      return false;
    }

    const { convert } = target.clientsById[clientId || target.info.default];
    const results = this.requests.map(request => convert(request, options));
    return results;
  }
}
