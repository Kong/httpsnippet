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
                fileName: 'src/fixtures/files/hello.txt',
                contentType: 'text/plain',
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
              form: {},
              headers: {
                'Content-Type': 'multipart/form-data; boundary=------------------------b74e534478e5833d',
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
