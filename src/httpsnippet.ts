import { Blob, FormData } from 'formdata-node';
import type { Param, PostDataCommon, Request as NpmHarRequest } from 'har-format';

import { formDataIterator, isBlob } from './helpers/form-data.js';
import { getHeaderName } from './helpers/headers.js';
import { ReducedHelperObject, reducer } from './helpers/reducer.js';
import { ExtendedURL, toSearchParams } from './helpers/url.js';
import { ClientId, TargetId, targets } from './targets/targets.js';

export { CodeBuilder } from './helpers/code-builder.js';
export { availableTargets, extname } from './helpers/utils.js';
export type { ClientId, TargetId };
export { addTarget, addTargetClient } from './targets/targets.js';

const DEBUG_MODE = false;

const debug = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- intentional noop
  info: DEBUG_MODE ? console.info : () => {},
};

/** is this wrong?  yes.  according to the spec (http://www.softwareishard.com/blog/har-12-spec/#postData) it's technically wrong since `params` and `text` are (by the spec) mutually exclusive.  However, in practice, this is not what is often the case.
 *
 * In general, this library takes a _descriptive_ rather than _perscriptive_ approach (see https://amyrey.web.unc.edu/classes/ling-101-online/tutorials/understanding-prescriptive-vs-descriptive-grammar/).
 *
 * Then, in addition to that, it really adds to complexity with TypeScript (TypeScript takes this constraint very very seriously) in a way that's not actually super useful.  So, we treat this object as though it could have both or either of `params` and/or `text`.
 */
type PostDataBase = PostDataCommon & {
  text?: string;
  params?: Param[];
};

export type HarRequest = Omit<NpmHarRequest, 'postData'> & { postData?: PostDataBase };

function basename(value: string): string {
  const parts = value.split('/');
  return parts[parts.length - 1];
}

export interface RequestExtras {
  postData?: PostDataBase & {
    jsonObj?: ReducedHelperObject;
    paramsObj?: ReducedHelperObject;
    boundary?: string;
  };
  fullUrl: string;
  queryObj: ReducedHelperObject;
  headersObj: ReducedHelperObject;
  uriObj: ExtendedURL;
  cookiesObj: ReducedHelperObject;
  allHeaders: ReducedHelperObject;
}

export type Request = HarRequest & RequestExtras;

interface Entry {
  request: Partial<HarRequest>;
}

interface HarEntry {
  log: {
    version: string;
    creator: {
      name: string;
      version: string;
    };
    entries: Entry[];
  };
}

const isHarEntry = (value: any): value is HarEntry =>
  typeof value === 'object' &&
  'log' in value &&
  typeof value.log === 'object' &&
  'entries' in value.log &&
  Array.isArray(value.log.entries);

export class HTTPSnippet {
  readonly requests: Promise<Request[]>;

  constructor(input: HarEntry | HarRequest) {
    let entries: Entry[] = [];

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

    this.requests = Promise.all(
      entries.map(({ request }) => {
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

        return this.prepare(req as HarRequest);
      }),
    );
  }

  async prepare(harRequest: HarRequest) {
    const request: Omit<Request, 'uriObj'> = {
      ...harRequest,
      fullUrl: '',
      queryObj: {},
      headersObj: {},
      cookiesObj: {},
      allHeaders: {},
    };

    // construct query objects
    if (request.queryString && request.queryString.length) {
      debug.info('queryString found, constructing queryString pair map');

      request.queryObj = request.queryString.reduce(reducer, {});
    }

    // construct headers objects
    if (request.headers && request.headers.length) {
      const http2VersionRegex = /^HTTP\/2/;
      request.headersObj = request.headers.reduce((accumulator, { name, value }) => {
        const headerName = http2VersionRegex.exec(request.httpVersion)
          ? name.toLocaleLowerCase()
          : name;
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
    const cookies = request.cookies?.map(
      ({ name, value }) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    );

    if (cookies?.length) {
      request.allHeaders.cookie = cookies.join('; ');
    }

    switch (request.postData?.mimeType) {
      case 'multipart/mixed':
      case 'multipart/related':
      case 'multipart/form-data':
      case 'multipart/alternative':
        // reset values
        request.postData.text = '';
        request.postData.mimeType = 'multipart/form-data';

        if (request.postData?.params) {
          const form = new FormData();

          // TODO: THIS ABSOLUTELY MUST BE REMOVED.
          // IT BREAKS SOME USE-CASES FOR MULTIPART FORMS THAT DEPEND ON BEING ABLE TO SET THE BOUNDARY.
          // easter egg
          const boundary = '---011000010111000001101001'; // this is binary for "api". yep.

          request.postData?.params.forEach(param => {
            const name = param.name;
            const value = param.value || '';
            const filename = param.fileName;

            if (isBlob(value)) {
              form.append(name, value, filename);
            } else {
              form.append(
                name,
                new Blob([value], { type: param.contentType }),
                filename ? basename(filename) : filename,
              );
            }
          });

          const { postData } = request;

          for await (const data of formDataIterator(form, boundary)) {
            postData.text += data;
          }

          request.postData.boundary = boundary;

          // Since headers are case-sensitive we need to see if there's an existing `Content-Type` header that we can override.
          const contentTypeHeader =
            getHeaderName(request.headersObj, 'content-type') || 'content-type';

          request.headersObj[contentTypeHeader] = `multipart/form-data; boundary=${boundary}`;
        }
        break;

      case 'application/x-www-form-urlencoded':
        if (!request.postData.params) {
          request.postData.text = '';
        } else {
          request.postData.paramsObj = request.postData.params.reduce<ReducedHelperObject>(
            reducer,
            {},
          );

          // always overwrite
          request.postData.text = toSearchParams(request.postData.paramsObj).toString();
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

    const url = new URL(request.url);

    const query = Object.fromEntries(url.searchParams);

    // query string key/value pairs in with literal querystrings contained within the url
    request.queryObj = {
      ...request.queryObj,
      ...query,
    }; //?

    const search = toSearchParams(request.queryObj);

    const fullUrl = new URL(request.url);
    fullUrl.search = search.toString();
    url.search = '';

    return {
      ...request,
      allHeaders,
      fullUrl: fullUrl.toString(),
      url: url.toString(),
      uriObj: new ExtendedURL(fullUrl.toString()),
    };
  }

  async convert(targetId: TargetId, clientId?: ClientId, options?: any) {
    if (!options && clientId) {
      options = clientId;
    }

    const target = targets[targetId];
    if (!target) {
      return false;
    }

    const { convert } = target.clientsById[clientId || target.info.default];
    const results = (await this.requests).map(request => convert(request, options));
    return results.length === 1 ? results[0] : results;
  }
}
