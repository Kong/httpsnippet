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
          httpVersion: 'HTTP/1.1',
          queryString: [
            {
              name: 'foo[bar]',
              value: 'baz,zap',
            },
            {
              name: 'fiz',
              value: 'buz',
            },
            {
              name: 'key',
              value: 'value',
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
              args: {
                fiz: 'buz',
                'foo[bar]': 'baz,zap',
                key: 'value',
              },
              data: '',
              files: {},
              form: {},
              headers: {
                Accept: '*/*',
              },
              json: null,
              method: 'GET',
              url: 'https://httpbin.org/anything?foo[bar]=baz%2Czap&fiz=buz&key=value',
            }),
          },
          headersSize: -1,
          bodySize: -1,
        },
      },
    ],
  },
};
