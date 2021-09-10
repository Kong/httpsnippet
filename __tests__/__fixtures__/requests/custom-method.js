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
          status: 405,
          statusText: 'Method Not Allowed',
          httpVersion: 'HTTP/1.1',
          headers: [
            {
              name: 'Content-Type',
              value: 'text/html',
            },
          ],
          content: {
            size: -1,
            mimeType: 'text/html',
            text: [
              '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">',
              '<title>405 Method Not Allowed</title>',
              '<h1>Method Not Allowed</h1>',
              '<p>The method is not allowed for the requested URL.</p>',
            ].join('\n'),
          },
          headersSize: -1,
          bodySize: -1,
        },
      },
    ],
  },
};
