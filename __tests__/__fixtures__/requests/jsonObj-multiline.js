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
            text: '{\n  "foo": "bar"\n}',
            mimeType: 'application/json',
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
              data: '{\n  "foo": "bar"\n}',
              files: {},
              form: {},
              headers: {
                'Content-Type': 'application/json',
              },
              json: {
                foo: 'bar',
              },
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
