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
              name: 'startTime',
              value: '2019-06-13T19%3A08%3A25.455Z',
            },
            {
              name: 'endTime',
              value: '2015-09-15T14%3A00%3A12-04%3A00',
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
                endTime: '2015-09-15T14:00:12-04:00',
                startTime: '2019-06-13T19:08:25.455Z',
              },
              data: '',
              files: {},
              form: {},
              headers: {},
              json: null,
              method: 'GET',
              url: 'https://httpbin.org/anything?startTime=2019-06-13T19%3A08%3A25.455Z&endTime=2015-09-15T14%3A00%3A12-04%3A00',
            }),
          },
          headersSize: -1,
          bodySize: -1,
        },
      },
    ],
  },
};
