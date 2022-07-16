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
              value: 'application/json',
            },
            {
              name: 'x-foo',
              value: 'Bar',
            },
            {
              name: 'x-bar',
              value: 'Foo',
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
                Accept: 'application/json',
                'X-Bar': 'Foo',
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
