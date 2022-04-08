import { map as eventStreamMap } from 'event-stream';
import FormData from 'form-data';
import { stringify as queryStringify } from 'querystring';
import { ReducedHelperObject, reducer } from './helpers/reducer';
import { Client, ClientId, Target, TargetId, targets } from './targets';
import { parse as urlParse, format as urlFormat, UrlWithParsedQuery } from 'url';
import { getHeaderName } from './helpers/headers';
import { formDataIterator, isBlob } from './helpers/form-data';
import { validateHarRequest } from './helpers/har-validator';

const DEBUG_MODE = false;

const debug = {
  info: DEBUG_MODE ? console.info : () => {},
};

export interface Request {
  httpVersion: string;
  queryString: {
    name: string;
    value: string;
  }[];
  headers: {
    name: string;
    value: string;
  }[];
  cookies: {
    name: string;
    value: string;
  }[];
  postData: {
    size?: number;
    mimeType?: string;
    jsonObj: ReducedHelperObject;
    paramsObj?: ReducedHelperObject;
    text?: string;
    boundary: string;
    params: {
      name: string;
      contentType?: string;
      value: string;
      fileName: string;
    }[];
  };
  bodySize: number;
  headersSize: number;
  method: string;
  url: string;
  fullUrl: string;
  queryObj: ReducedHelperObject;
  headersObj: ReducedHelperObject;
  uriObj: UrlWithParsedQuery;
  cookiesObj: ReducedHelperObject;
  allHeaders: ReducedHelperObject;
}

interface Entry {
  request: Request;
}

interface HarEntry {
  log: {
    entries: Entry[];
  };
}

const isHarEntry = (value: any): value is HarEntry =>
  typeof value === 'object' && 'log' in value && typeof value.log === 'object' && 'entries' in value.log && Array.isArray(value.log.entries);

type HTTPSnippetConstructor = HarEntry | Request;

export class HTTPSnippet {
  requests: Request[] = [];

  constructor(input: HTTPSnippetConstructor) {
    let entries: Entry[] = [];

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

    entries.forEach(entry => {
      // add optional properties to make validation successful
      entry.request.httpVersion = entry.request.httpVersion || 'HTTP/1.1';
      entry.request.queryString = entry.request.queryString || [];
      entry.request.headers = entry.request.headers || [];
      entry.request.cookies = entry.request.cookies || [];
      entry.request.postData = entry.request.postData || {};
      entry.request.postData.mimeType = entry.request.postData.mimeType || 'application/octet-stream';

      entry.request.bodySize = 0;
      entry.request.headersSize = 0;
      entry.request.postData.size = 0;

      if (validateHarRequest(entry.request)) {
        const request = this.prepare(entry.request);
        this.requests.push(request);
      }
    });
  }

  prepare = (request: Request) => {
    // construct utility properties
    request.queryObj = {};
    request.headersObj = {};
    request.cookiesObj = {};
    request.allHeaders = {};

    // construct query objects
    if (request.queryString && request.queryString.length) {
      debug.info('queryString found, constructing queryString pair map');

      request.queryObj = request.queryString.reduce(reducer, {});
    }

    // construct headers objects
    if (request.headers && request.headers.length) {
      const http2VersionRegex = /^HTTP\/2/;
      request.headersObj = request.headers.reduce((accumulator, { name, value }) => {
        const headerName = request.httpVersion.match(http2VersionRegex) ? name.toLocaleLowerCase() : name;
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
    const cookies = request.cookies.map(({ name, value }) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`);

    if (cookies.length) {
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

        if (request.postData.params) {
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

          request.postData.params.forEach(param => {
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

          request.headersObj[contentTypeHeader] = 'multipart/form-data; boundary=' + boundary;
        }
        break;

      case 'application/x-www-form-urlencoded':
        if (!request.postData.params) {
          request.postData.text = '';
        } else {
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
            debug.info(e);

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

    const parsedUrl = urlParse(request.url, true, true); //?

    // query string key/value pairs in with literal querystrings containd within the url
    request.queryObj = {
      ...request.queryObj,
      ...(parsedUrl.query as ReducedHelperObject),
    }; //?

    // reset uriObj values for a clean url
    const uriObj = {
      query: request.queryObj,
      search: queryStringify(request.queryObj),
      path: parsedUrl.pathname,
    };

    if (uriObj.search) {
      uriObj.path = `${uriObj.path}?${uriObj.search}`;
    }

    // keep the base url clean of queryString
    const url = urlFormat({
      ...parsedUrl,
      query: null,
      search: null,
    }); //?

    const fullUrl = urlFormat({
      ...parsedUrl,
      ...uriObj,
    }); //?

    return {
      ...request,
      allHeaders,
      fullUrl,
      url,
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

export const addTarget = (target: Target) => {
  if (!('info' in target)) {
    throw new Error('The supplied custom target must contain an `info` object.');
  }

  if (!('key' in target.info) || !('title' in target.info) || !('extname' in target.info) || !('default' in target.info)) {
    throw new Error('The supplied custom target must have an `info` object with a `key`, `title`, `extname`, and `default` property.');
  }

  if (targets.hasOwnProperty(target.info.key)) {
    throw new Error('The supplied custom target already exists.');
  }

  if (Object.keys(target).length === 1) {
    throw new Error('A custom target must have a client defined on it.');
  }

  targets[target.info.key] = target;
};

export const addTargetClient = (targetId: TargetId, client: Client) => {
  if (!targets.hasOwnProperty(targetId)) {
    throw new Error(`Sorry, but no ${targetId} target exists to add clients to.`);
  }

  if (!('info' in client)) {
    throw new Error('The supplied custom target client must contain an `info` object.');
  }

  if (!('key' in client.info) || !('title' in client.info)) {
    throw new Error('The supplied custom target client must have an `info` object with a `key` and `title` property.');
  }

  if (targets[targetId].hasOwnProperty(client.info.key)) {
    throw new Error('The supplied custom target client already exists, please use a different key');
  }

  targets[targetId].clientsById[client.info.key] = client;
};
