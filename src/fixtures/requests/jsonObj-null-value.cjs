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
            params: [],
            text: '{"foo":null}',
            // stored: true,
            mimeType: 'application/json',
            // size: 0,
            // jsonObj: {
            //   foo: null,
            // },
            // paramsObj: false,
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
              data: '{"foo":null}',
              files: {},
              form: {},
              headers: {
                'Content-Type': ['application/json'],
              },
              json: {
                foo: null,
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
