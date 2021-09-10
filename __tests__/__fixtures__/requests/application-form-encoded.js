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
              value: 'application/x-www-form-urlencoded',
            },
          ],
          postData: {
            mimeType: 'application/x-www-form-urlencoded',
            params: [
              {
                name: 'foo',
                value: 'bar',
              },
              {
                name: 'hello',
                value: 'world',
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
              files: {},
              form: {
                foo: 'bar',
                hello: 'world',
              },
              headers: {
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
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
