import type { Request } from '.';

import { mimetypes } from './fixtures/mimetypes';
import headers from './fixtures/requests/headers';
import query from './fixtures/requests/query';
import short from './fixtures/requests/short';

import { HTTPSnippet } from '.';

describe('HTTPSnippet', () => {
  it('should return false if no matching target', () => {
    const snippet = new HTTPSnippet(short.log.entries[0].request as Request);
    // @ts-expect-error intentionally incorrect
    const result = snippet.convert(null);

    expect(result).toBe(false);
  });

  it('should fail validation for non-HAR inputs', () => {
    expect.assertions(1);

    // @ts-expect-error intentionally incorrect
    const attempt = () => new HTTPSnippet({ ziltoid: 'the omniscient' });

    expect(attempt).toThrow('validation failed');
  });

  describe('repair malformed `postData`', () => {
    it('should repair a HAR with an empty `postData` object', () => {
      const snippet = new HTTPSnippet({
        method: 'POST',
        url: 'https://httpbin.org/anything',
        postData: {},
      } as Request);

      const request = snippet.requests[0];
      expect(request.postData).toStrictEqual({
        mimeType: 'application/octet-stream',
      });
    });

    it('should repair a HAR with a `postData` params object missing `mimeType`', () => {
      // @ts-expect-error Testing a malformed HAR case.
      const snippet = new HTTPSnippet({
        method: 'POST',
        url: 'https://httpbin.org/anything',
        postData: {
          params: [],
        },
      } as Request);

      const request = snippet.requests[0];
      expect(request.postData).toStrictEqual({
        mimeType: 'application/octet-stream',
        params: [],
      });
    });

    it('should repair a HAR with a `postData` text object missing `mimeType`', () => {
      const snippet = new HTTPSnippet({
        method: 'POST',
        url: 'https://httpbin.org/anything',
        postData: {
          text: '',
        },
      } as Request);

      const request = snippet.requests[0];
      expect(request.postData).toStrictEqual({
        mimeType: 'application/octet-stream',
        text: '',
      });
    });
  });

  it('should parse HAR file with multiple entries', () => {
    const snippet = new HTTPSnippet({
      log: {
        version: '1.2',
        creator: {
          name: 'HTTPSnippet',
          version: '1.0.0',
        },
        entries: [
          {
            request: {
              method: 'GET',
              url: 'https://httpbin.org/anything',
            },
          },
          {
            request: {
              method: 'POST',
              url: 'https://httpbin.org/anything',
            },
          },
        ],
      },
    });

    expect(snippet).toHaveProperty('requests');
    expect(Array.isArray(snippet.requests)).toBeTruthy();
    expect(snippet.requests).toHaveLength(2);
  });

  describe('mimetype conversion', () => {
    it.each([
      {
        input: 'multipart/mixed',
        expected: 'multipart/form-data',
      },
      {
        input: 'multipart/related',
        expected: 'multipart/form-data',
      },
      {
        input: 'multipart/alternative',
        expected: 'multipart/form-data',
      },
      {
        input: 'text/json',
        expected: 'application/json',
      },
      {
        input: 'text/x-json',
        expected: 'application/json',
      },
      {
        input: 'application/x-json',
        expected: 'application/json',
      },
      {
        input: 'invalid-json',
        expected: 'text/plain',
      },
    ] as {
      input: keyof typeof mimetypes;
      expected: string;
    }[])('mimetype conversion of $input to $output', ({ input, expected }) => {
      const snippet = new HTTPSnippet(mimetypes[input]);
      const request = snippet.requests[0];

      expect(request.postData.mimeType).toStrictEqual(expected);
    });
  });

  it('should set postData.text to empty string when postData.params is undefined in application/x-www-form-urlencoded', () => {
    const snippet = new HTTPSnippet(mimetypes['application/x-www-form-urlencoded']);
    const request = snippet.requests[0];

    expect(request.postData.text).toBe('');
  });

  describe('requestExtras', () => {
    describe('uriObj', () => {
      it('should add uriObj', () => {
        const snippet = new HTTPSnippet(query.log.entries[0].request as Request);
        const request = snippet.requests[0];

        expect(request.uriObj).toMatchObject({
          auth: null,
          hash: null,
          host: 'httpbin.org',
          hostname: 'httpbin.org',
          href: 'https://httpbin.org/anything?key=value',
          path: '/anything?foo=bar&foo=baz&baz=abc&key=value',
          pathname: '/anything',
          port: null,
          protocol: 'https:',
          query: {
            baz: 'abc',
            key: 'value',
            foo: ['bar', 'baz'],
          },
          search: 'foo=bar&foo=baz&baz=abc&key=value',
          slashes: true,
        });
      });

      it('should fix the `path` property of uriObj to match queryString', () => {
        const snippet = new HTTPSnippet(query.log.entries[0].request as Request);
        const request = snippet.requests[0];

        expect(request.uriObj.path).toBe('/anything?foo=bar&foo=baz&baz=abc&key=value');
      });
    });

    describe('queryObj', () => {
      it('should add queryObj', () => {
        const snippet = new HTTPSnippet(query.log.entries[0].request as Request);
        const request = snippet.requests[0];

        expect(request.queryObj).toMatchObject({ baz: 'abc', key: 'value', foo: ['bar', 'baz'] });
      });
    });

    describe('headersObj', () => {
      it('should add headersObj', () => {
        const snippet = new HTTPSnippet(headers.log.entries[0].request as Request);
        const request = snippet.requests[0];

        expect(request.headersObj).toMatchObject({
          accept: 'application/json',
          'x-foo': 'Bar',
        });
      });

      it('should add headersObj to source object case insensitive when HTTP/1.0', () => {
        const snippet = new HTTPSnippet({
          ...headers.log.entries[0].request,
          httpVersion: 'HTTP/1.1',
          headers: [
            ...headers.log.entries[0].request.headers,
            {
              name: 'Kong-Admin-Token',
              value: 'Ziltoid The Omniscient',
            },
          ],
        } as Request);

        const request = snippet.requests[0];

        expect(request.headersObj).toMatchObject({
          'Kong-Admin-Token': 'Ziltoid The Omniscient',
          accept: 'application/json',
          'x-foo': 'Bar',
        });
      });

      it('should add headersObj to source object lowercased when HTTP/2.x', () => {
        const snippet = new HTTPSnippet({
          ...headers.log.entries[0].request,
          httpVersion: 'HTTP/2',
          headers: [
            ...headers.log.entries[0].request.headers,
            {
              name: 'Kong-Admin-Token',
              value: 'Ziltoid The Omniscient',
            },
          ],
        } as Request);

        const request = snippet.requests[0];

        expect(request.headersObj).toMatchObject({
          'kong-admin-token': 'Ziltoid The Omniscient',
          accept: 'application/json',
          'x-foo': 'Bar',
        });
      });
    });

    describe('url', () => {
      it('should modify the original url to strip query string', () => {
        const snippet = new HTTPSnippet(query.log.entries[0].request as Request);
        const request = snippet.requests[0];

        expect(request.url).toBe('https://httpbin.org/anything');
      });
    });

    describe('fullUrl', () => {
      it('adds fullURL', () => {
        const snippet = new HTTPSnippet(query.log.entries[0].request as Request);
        const request = snippet.requests[0];

        expect(request.fullUrl).toBe('https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value');
      });
    });
  });
});
