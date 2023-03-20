import { describe, expect, it } from '@jest/globals';

import { mimetypes } from './fixtures/mimetypes.js';
import headers from './fixtures/requests/headers.json';
import query from './fixtures/requests/query.json';
import short from './fixtures/requests/short.json';
import { HTTPSnippet, Request } from './httpsnippet.js';

describe('hTTPSnippet', () => {
  it('should return false if no matching target', async () => {
    const snippet = new HTTPSnippet(short as Request);
    // @ts-expect-error intentionally incorrect
    const result = await snippet.convert(null);

    expect(result).toBe(false);
  });

  it('should parse HAR file with multiple entries', async () => {
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
              url: 'http://mockbin.com/har',
            },
          },
          {
            request: {
              method: 'POST',
              url: 'http://mockbin.com/har',
            },
          },
        ],
      },
    });

    expect(snippet).toHaveProperty('requests');
    expect(Array.isArray(await snippet.requests)).toBeTruthy();
    await expect(snippet.requests).resolves.toHaveLength(2);
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
    }[])(`mimetype conversion of $input to $output`, async ({ input, expected }) => {
      const snippet = new HTTPSnippet(mimetypes[input]);
      const request = (await snippet.requests)[0];

      expect(request.postData).toHaveProperty('mimeType', expected);
    });
  });

  it('should set postData.text to empty string when postData.params is undefined in application/x-www-form-urlencoded', async () => {
    const snippet = new HTTPSnippet(mimetypes['application/x-www-form-urlencoded']);
    const request = (await snippet.requests)[0];

    expect(request.postData).toHaveProperty('text', '');
  });

  describe('requestExtras', () => {
    describe('uriObj', () => {
      it('should add uriObj', async () => {
        const snippet = new HTTPSnippet(query as Request);
        const request = (await snippet.requests)[0];

        const keys = ['path', ...Object.getOwnPropertyNames(URL.prototype)];
        const uriObj: Record<string, unknown> = {};
        for (const key of keys) {
          uriObj[key] = request.uriObj[key as keyof typeof request.uriObj];
        }

        expect(uriObj).toMatchObject({
          hash: '',
          host: 'mockbin.com',
          hostname: 'mockbin.com',
          href: 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value',
          path: '/har?foo=bar&foo=baz&baz=abc&key=value',
          pathname: '/har',
          port: '',
          protocol: 'http:',
          search: '?foo=bar&foo=baz&baz=abc&key=value',
        });

        expect(
          JSON.parse(JSON.stringify(Array.from(request.uriObj.searchParams.entries()))),
        ).toStrictEqual([
          ['foo', 'bar'],
          ['foo', 'baz'],
          ['baz', 'abc'],
          ['key', 'value'],
        ]);
      });

      it('should fix the `path` property of uriObj to match queryString', async () => {
        const snippet = new HTTPSnippet(query as Request);
        const request = (await snippet.requests)[0];

        expect(request.uriObj.path).toBe('/har?foo=bar&foo=baz&baz=abc&key=value');
      });
    });

    describe('queryObj', () => {
      it('should add queryObj', async () => {
        const snippet = new HTTPSnippet(query as Request);
        const request = (await snippet.requests)[0];

        expect(request.queryObj).toMatchObject({ baz: 'abc', key: 'value', foo: ['bar', 'baz'] });
      });
    });

    describe('headersObj', () => {
      it('should add headersObj', async () => {
        const snippet = new HTTPSnippet(headers as Request);
        const request = (await snippet.requests)[0];

        expect(request.headersObj).toMatchObject({
          accept: 'application/json',
          'x-foo': 'Bar',
        });
      });

      it('should add headersObj to source object case insensitive when HTTP/1.0', async () => {
        const snippet = new HTTPSnippet({
          ...headers,
          httpVersion: 'HTTP/1.1',
          headers: [
            ...headers.headers,
            {
              name: 'Kong-Admin-Token',
              value: 'Ziltoid The Omniscient',
            },
          ],
        } as Request);

        const request = (await snippet.requests)[0];

        expect(request.headersObj).toMatchObject({
          'Kong-Admin-Token': 'Ziltoid The Omniscient',
          accept: 'application/json',
          'x-foo': 'Bar',
        });
      });

      it('should add headersObj to source object lowercased when HTTP/2.x', async () => {
        const snippet = new HTTPSnippet({
          ...headers,
          httpVersion: 'HTTP/2',
          headers: [
            ...headers.headers,
            {
              name: 'Kong-Admin-Token',
              value: 'Ziltoid The Omniscient',
            },
          ],
        } as Request);

        const request = (await snippet.requests)[0];

        expect(request.headersObj).toMatchObject({
          'kong-admin-token': 'Ziltoid The Omniscient',
          accept: 'application/json',
          'x-foo': 'Bar',
        });
      });
    });

    describe('url', () => {
      it('should modify the original url to strip query string', async () => {
        const snippet = new HTTPSnippet(query as Request);
        const request = (await snippet.requests)[0];

        expect(request.url).toBe('http://mockbin.com/har');
      });
    });

    describe('fullUrl', () => {
      it('adds fullURL', async () => {
        const snippet = new HTTPSnippet(query as Request);
        const request = (await snippet.requests)[0];

        expect(request.fullUrl).toBe('http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value');
      });
    });
  });
});
