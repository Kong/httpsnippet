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
          url: 'https://httpbin.org/headers',
          headers: [
            {
              name: 'accept',
              value: 'text/json',
            },
            {
              name: 'x-foo',
              value: 'Bar',
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
              headers: {
                Accept: 'text/json',
                'X-Foo': 'Bar',
              },
            }),
          },
          headersSize: -1,
          bodySize: -1,
        },
      },
    ],
  },
};
