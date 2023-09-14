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
          method: 'GET',
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
              data: '',
              files: {},
              form: {},
              headers: {},
              json: null,
              method: 'GET',
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
