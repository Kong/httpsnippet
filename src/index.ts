import type { ReducedHelperObject } from './helpers/reducer';
import type { ClientId, TargetId } from './targets';
import type { Param, PostDataCommon, Request as NpmHarRequest } from 'har-format';
import type { UrlWithParsedQuery } from 'node:url';

import { format as urlFormat, parse as urlParse } from 'node:url';

import { map as eventStreamMap } from 'event-stream';
import FormData from 'form-data';
import { stringify as queryStringify } from 'qs';

import { formDataIterator, isBlob } from './helpers/form-data';
import { getHeaderName } from './helpers/headers';
import { reducer } from './helpers/reducer';
import { targets } from './targets';

export { availableTargets, extname } from './helpers/utils';
export { addTarget, addTargetClient } from './targets';

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
  requests: Request[] = [];

  constructor(input: HarEntry | HarRequest, opts: HTTPSnippetOptions = {}) {
    let entries: Entry[] = [];

    const options = {
      harIsAlreadyEncoded: false,
      ...opts,
    };

    // prep the main container
    this.requests = [];

    // is it har?
    if (isHarEntry(input)) {
      entries = input.log.entries;
    } else {
      entries = [
        {
          request: input,
        },
      ];
    }

    entries.forEach(({ request }) => {
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

      this.requests.push(this.prepare(req as HarRequest, options));
    });
  }

  prepare = (harRequest: HarRequest, options: HTTPSnippetOptions) => {
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
          const form = new FormData();

          // The `form-data` module returns one of two things: a native FormData object, or its own polyfill
          // Since the polyfill does not support the full API of the native FormData object, when this library is running in a browser environment it'll fail on two things:
          //
          //  1. The API for `form.append()` has three arguments and the third should only be present when the second is a
          //    Blob or USVString.
          //  1. `FormData.pipe()` isn't a function.
          //
          // Since the native FormData object is iterable, we easily detect what version of `form-data` we're working with here to allow `multipart/form-data` requests to be compiled under both browser and Node environments.
          //
          // This hack is pretty awful but it's the only way we can use this library in the browser as if we code this against just the native FormData object, we can't polyfill that back into Node because Blob and File objects, which something like `formdata-polyfill` requires, don't exist there.
          // @ts-expect-error TODO
          const isNativeFormData = typeof form[Symbol.iterator] === 'function';

          // TODO: THIS ABSOLUTELY MUST BE REMOVED.
          // IT BREAKS SOME USE-CASES FOR MULTIPART FORMS THAT DEPEND ON BEING ABLE TO SET THE BOUNDARY.
          // easter egg
          const boundary = '---011000010111000001101001'; // this is binary for "api". yep.
          if (!isNativeFormData) {
            // @ts-expect-error THIS IS WRONG.  VERY WRONG.
            form._boundary = boundary;
          }

          request.postData?.params.forEach(param => {
            const name = param.name;
            const value = param.value || '';
            const filename = param.fileName || null;

            if (isNativeFormData) {
              if (isBlob(value)) {
                // @ts-expect-error TODO
                form.append(name, value, filename);
              } else {
                form.append(name, value);
              }
            } else {
              form.append(name, value, {
                // @ts-expect-error TODO
                filename,
                // @ts-expect-error TODO
                contentType: param.contentType || null,
              });
            }
          });

          if (isNativeFormData) {
            // eslint-disable-next-line no-restricted-syntax
            for (const data of formDataIterator(form, boundary)) {
              request.postData.text += data;
            }
          } else {
            form.pipe(
              // @ts-expect-error TODO
              eventStreamMap(data => {
                request.postData.text += data;
              }),
            );
          }

          request.postData.boundary = boundary;

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
  };

  convert = (targetId: TargetId, clientId?: ClientId, options?: any) => {
    if (!options && clientId) {
      options = clientId;
    }

    const target = targets[targetId];
    if (!target) {
      return false;
    }

    const { convert } = target.clientsById[clientId || target.info.default];
    const results = this.requests.map(request => convert(request, options));
    return results.length === 1 ? results[0] : results;
  };
}
