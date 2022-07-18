import { mimetypes } from './fixtures/mimetypes';
import headers from './fixtures/requests/headers.json';
import query from './fixtures/requests/query.json';
import short from './fixtures/requests/short.json';
import { HTTPSnippet, Request } from './httpsnippet';

describe('hTTPSnippet', () => {
  it('should return false if no matching target', () => {
    const snippet = new HTTPSnippet(short as Request);
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
    }[])(`mimetype conversion of $input to $output`, ({ input, expected }) => {
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
        const snippet = new HTTPSnippet(query as Request);
        const request = snippet.requests[0];

        expect(request.uriObj).toMatchObject({
          auth: null,
          hash: null,
          host: 'mockbin.com',
          hostname: 'mockbin.com',
          href: 'http://mockbin.com/har?key=value',
          path: '/har?foo=bar&foo=baz&baz=abc&key=value',
          pathname: '/har',
          port: null,
          protocol: 'http:',
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
        const snippet = new HTTPSnippet(query as Request);
        const request = snippet.requests[0];

        expect(request.uriObj.path).toBe('/har?foo=bar&foo=baz&baz=abc&key=value');
      });
    });

    describe('queryObj', () => {
      it('should add queryObj', () => {
        const snippet = new HTTPSnippet(query as Request);
        const request = snippet.requests[0];

        expect(request.queryObj).toMatchObject({ baz: 'abc', key: 'value', foo: ['bar', 'baz'] });
      });
    });

    describe('headersObj', () => {
      it('should add headersObj', () => {
        const snippet = new HTTPSnippet(headers as Request);
        const request = snippet.requests[0];

        expect(request.headersObj).toMatchObject({
          accept: 'application/json',
          'x-foo': 'Bar',
        });
      });

      it('should add headersObj to source object case insensitive when HTTP/1.0', () => {
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

        const request = snippet.requests[0];

        expect(request.headersObj).toMatchObject({
          'Kong-Admin-Token': 'Ziltoid The Omniscient',
          accept: 'application/json',
          'x-foo': 'Bar',
        });
      });

      it('should add headersObj to source object lowercased when HTTP/2.x', () => {
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
        const snippet = new HTTPSnippet(query as Request);
        const request = snippet.requests[0];

        expect(request.url).toBe('http://mockbin.com/har');
      });
    });

    describe('fullUrl', () => {
      it('adds fullURL', () => {
        const snippet = new HTTPSnippet(query as Request);
        const request = snippet.requests[0];

        expect(request.fullUrl).toBe('http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value');
      });
    });
  });

  describe('options', () => {
    describe('decodeUri', () => {
      const input = {
        method: 'GET',
        url: 'http://mockbin.com/request/{id}',
        httpVersion: 'HTTP/1.1',
      } as Request;

      describe('decodeUri=false', () => {
        const { fullUrl, url, uriObj } = new HTTPSnippet(input, { decodeUri: false }).requests[0];

        it('should encode fullUrl', () => {
          expect(fullUrl).toBe('http://mockbin.com/request/%7Bid%7D');
        });

        it('should encode url', () => {
          expect(url).toBe('http://mockbin.com/request/%7Bid%7D');
        });

        it('should encode uriObj.path', () => {
          expect(uriObj.path).toBe('/request/%7Bid%7D');
        });

        it('should encode uriObj.pathname', () => {
          expect(uriObj.pathname).toBe('/request/%7Bid%7D');
        });

        it('should encode uriObj.href', () => {
          expect(uriObj.href).toBe('http://mockbin.com/request/%7Bid%7D');
        });
      });

      describe('decodeUri=true', () => {
        const { fullUrl, url, uriObj } = new HTTPSnippet(input, { decodeUri: true }).requests[0];

        it('should decode fullUrl', () => {
          expect(fullUrl).toBe('http://mockbin.com/request/{id}');
        });

        it('should decode url', () => {
          expect(url).toBe('http://mockbin.com/request/{id}');
        });

        it('should decode uriObj.path', () => {
          expect(uriObj.path).toBe('/request/{id}');
        });

        it('should decode uriObj.pathname', () => {
          expect(uriObj.pathname).toBe('/request/{id}');
        });

        it('should decode uriObj.href', () => {
          expect(uriObj.href).toBe('http://mockbin.com/request/{id}');
        });
      });
    });
  });
});
