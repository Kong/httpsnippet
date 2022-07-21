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
          url: 'https://httpbin.org/anything',
          headers: [
            {
              name: 'content-type',
              value: 'application/json',
            },
          ],
          postData: {
            // Per the HAR spec `postData` should always have `mimeType` but this fixture is
            // testing when that isn't the case.
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
              args: {},
              data: '',
              files: {},
              form: {},
              headers: {
                'Content-Type': 'application/json',
              },
              json: null,
              method: 'POST',
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
