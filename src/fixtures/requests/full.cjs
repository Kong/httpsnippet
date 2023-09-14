module.exports = {
  log: {
    version: '1.2',
    creator: {
      name: 'HTTPSnippet',
      version: '1.0.0',
    },
    entries: [
      {
        request: {
          method: 'POST',
          url: 'https://httpbin.org/anything?key=value',
          httpVersion: 'HTTP/1.1',
          queryString: [
            {
              name: 'foo',
              value: 'bar',
            },
            {
              name: 'foo',
              value: 'baz',
            },
            {
              name: 'baz',
              value: 'abc',
            },
          ],
          headers: [
            {
              name: 'accept',
              value: 'application/json',
            },
            {
              name: 'content-type',
              value: 'application/x-www-form-urlencoded',
            },
          ],
          cookies: [
            {
              name: 'foo',
              value: 'bar',
            },
            {
              name: 'bar',
              value: 'baz',
            },
          ],
          postData: {
            mimeType: 'application/x-www-form-urlencoded',
            params: [
              {
                name: 'foo',
                value: 'bar',
              },
            ],
          },
        },
        response: {
          status: 200,
          statusText: 'OK',
          httpVersion: 'HTTP/1.1',
          headers: [
            {
              name: 'Content-Type',
              value: 'application/json',
            },
          ],
          content: {
            size: -1,
            mimeType: 'application/json',
            text: JSON.stringify({
              args: {
                baz: ['abc'],
                foo: ['bar', 'baz'],
                key: ['value'],
              },
              data: 'foo=bar',
              files: {},
              form: {
                foo: ['bar'],
              },
              headers: {
                Accept: ['application/json'],
                'Content-Type': ['application/x-www-form-urlencoded'],
                Cookie: ['foo=bar; bar=baz'],
              },
              json: null,
              method: 'POST',
              url: 'https://httpbin.org/anything?foo=bar&foo=baz&baz=abc&key=value',
            }),
          },
          headersSize: -1,
          bodySize: -1,
        },
      },
    ],
  },
};
