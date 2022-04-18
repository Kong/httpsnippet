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
              value: 'multipart/form-data',
            },
          ],
          postData: {
            mimeType: 'multipart/form-data',
            params: [
              {
                name: 'foo',
                value: 'Hello World',
                fileName: '__tests__/__fixtures__/files/hello.txt',
                contentType: 'text/plain',
              },
              {
                name: 'bar',
                value: 'Bonjour le monde',
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
              args: {},
              data: '',
              files: {
                foo: 'Hello World',
              },
              form: {
                bar: 'Bonjour le monde',
              },
              headers: {
                'Content-Type': 'multipart/form-data; boundary=------------------------6e4b42ed3719ed70',
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
