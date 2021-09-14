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
              data: '',
              files: {},
              form: {},
              headers: {},
              json: null,
              method: 'GET',
              url: 'https://httpbin.org/anything',
            }),
          },
          headersSize: -1,
          bodySize: -1,
        },
      },
    ],
  },
};
