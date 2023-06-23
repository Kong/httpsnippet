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
          method: 'PROPFIND',
          url: 'https://httpbin.org/anything',
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
              args: {},
              headers: {},
              method: 'PROPFIND',
              origin: '127.0.0.1:49488',
              url: 'https://httpbin.org/anything',
              data: '',
              files: {},
              form: {},
              json: null,
            }),
          },
          headersSize: -1,
          bodySize: -1,
        },
        headersSize: -1,
        bodySize: -1,
      },
    ],
  },
};
